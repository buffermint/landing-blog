---
title: "Remove a background in the browser: 6 open models measured"
seo_description: "We measured six open background-removal models on 8 ground-truth cut-outs: edge quality, size, speed, memory and the licences that decide what you can ship."
keyword: remove background from image
featured_image: assets/img/uploads/remove-background-browser-models-cover.jpeg
featured_thumbnail: assets/img/uploads/remove-background-browser-models-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

Removing the background from a photo used to mean uploading it to a service. Today an open model can do it inside the browser tab, so the photo never leaves your device. We built our [background remover](/tools/photo/background-remover/) that way, and to choose its model we measured six open models on the same test images, with exact ground truth.

This post shares those measurements: which models get hair and fur right, how big they are, how fast they run, how much memory they take, and the licence detail that rules out the best-scoring model for most products. It's for anyone choosing a background remover, and for founders adding cut-outs to an app.

## How we measured

Our test set is 8 photos with a free licence (CC0 or CC-BY): a person in a dress, a headshot, a dog, a cat, a kiwi fruit, a clover flower, plastic flowers and a camera. Each cut-out was composited onto a plain, a busy or a similar-colored background, so we know the exact correct transparency of every pixel. The images are 0.5 to 1.6 megapixels.

We report three numbers:

- **Mask IoU:** how much the predicted subject overlaps the true subject (1.0 = perfect). It's the number most leaderboards use.
- **Boundary F (3 px):** how many edge pixels land within 3 pixels of the true edge. This is where cut-outs look right or wrong.
- **Edge-band error:** the average transparency error in a band around the edges, which is where hair and fur live. Lower is better.

We ran the models two ways. First through [rembg](https://github.com/danielgatis/rembg), the popular open-source Python tool, on a Mac CPU, as a reference. Then through our own browser pipeline, the same code the tool page runs, on 22 October 2026: WebGPU in Google Chrome on an Apple M5 Mac, or WebAssembly where WebGPU isn't available.

## Results: the reference run (rembg, CPU)

| Model | Mask IoU | Boundary F | Edge-band error | Seconds per image (CPU) | Licence |
|---|---|---|---|---|---|
| U²-Net (u2net) | 0.872 | 0.834 | 0.136 | 0.32 | [Apache-2.0](https://github.com/xuebinqin/U-2-Net) |
| IS-Net (isnet-general-use) | 0.987 | 0.947 | 0.057 | 0.71 | [Apache-2.0](https://github.com/xuebinqin/DIS) |
| BiRefNet (general) | 0.995 | 0.990 | 0.038 | 10.3 | [MIT](https://github.com/ZhengPeng7/BiRefNet) |
| BiRefNet (portrait) | 0.995 | 0.989 | 0.044 | 9.4 | MIT |
| BRIA RMBG-2.0 (rembg's `bria-rmbg`) | 0.995 | 0.991 | 0.041 | 7.8 | [CC BY-NC 4.0](https://huggingface.co/briaai/RMBG-2.0): non-commercial |

*Our measurements, 8 ground-truth images, October 2026.*

Two things stand out.

**IoU hides the differences people see.** IS-Net and BiRefNet are less than 0.01 apart on IoU, but BiRefNet's edge-band error is a third lower. On a portrait, that's the difference between hair that looks cut with scissors and hair that looks real. A leaderboard sorted by IoU would call them nearly equal.

**One bad image can sink a model.** U²-Net's average IoU of 0.872 comes almost entirely from one photo: on the clover flower against a busy background, its IoU was **0.129**. It lost the subject. On the other seven images it scored 0.90 to 0.99. If your users photograph small subjects on busy backgrounds (plants, jewelry, food), test that case specifically.

## Results: in the browser

The reference run is on a desktop CPU with no download size limit. In a browser tab, the model has to be downloaded first and must fit in the tab's memory. That changes the ranking.

| Model, as served | Download | Boundary F | Edge-band error | Speed (warm) | Peak tab memory | Licence |
|---|---|---|---|---|---|---|
| BiRefNet_lite, our int8 build (WebGPU) | 68 MB | 0.988 | 0.044 | 2.0 s per 12 MP photo | 1.04 GB | MIT |
| BiRefNet_lite, original fp32 | – | 0.987 | 0.044 | – | – | MIT |
| BiRefNet full, int8 | 269 MB | 0.989 | 0.044 | about 4× the compute of lite | – | MIT |
| BEN2 base, fp16 | 219 MB | 0.977 | 0.068 | – | – | [MIT](https://huggingface.co/PramaLLC/BEN2) (base model only) |
| ORMBG, int8 (WebAssembly) | 44 MB | 0.952 | 0.066 | 6.5 s at 1 MP, 8.1 s at 12 MP | 1.47 GB | [Apache-2.0](https://huggingface.co/onnx-community/ormbg-ONNX) |

*Our measurements, same 8 images, same pipeline as the tool page, 22 October 2026. A dash means we didn't time that build in the browser.*

What we took from this:

- **The lite model is as good as the full one here.** BiRefNet_lite at 68 MB scored within measurement noise of full BiRefNet at 269 MB (boundary F 0.988 vs 0.989, same edge error). Full BiRefNet scored 0.990 in the rembg run and 0.989 in ours, so the small gap is mostly pipeline, not model.
- **Bigger isn't better.** BEN2's base model is three times the download of our lite build and has worse edges (0.068 vs 0.044).
- **WebAssembly needs a smaller model.** Without WebGPU, BiRefNet_lite took about 10 seconds per image even as native single-threaded code, would be roughly three times slower in a browser, and ran out of the 4 GB WebAssembly memory limit. So the tool falls back to ORMBG on browsers without WebGPU and on low-memory devices, and tells you which engine ran. Hugging Face's [Transformers.js docs](https://huggingface.co/docs/transformers.js/guides/webgpu) put global WebGPU support at around 85% as of March 2026, so the fallback matters for about one visitor in seven.
- **Phones are untested.** Peak tab memory was 1.04 GB with the lite model and 1.47 GB with the WebAssembly fallback on a desktop. We haven't measured either on a phone yet, where a tab has far less memory to work with, so treat mobile as unproven.

## What went wrong on the way (and might for you)

If you're putting one of these models into your own web app, two problems cost us the most time.

**A model that loads isn't necessarily the model that runs.** The ready-made fp16 export of BiRefNet_lite didn't run on ONNX Runtime Web's WebGPU backend: some of its layers split into 32 outputs, more than a WebGPU shader can bind, and others fell back to the CPU and exhausted memory. Our page then quietly fell back to the smaller model, so for a while users downloaded 115 MB and got ORMBG's edges. Log which engine and model actually produced each result. [ONNX Runtime's WebGPU guide](https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html) covers setup, but not which operators fall back, so test your exact model file.

**Standard quantization didn't shrink it enough.** ONNX Runtime's dynamic int8 quantizer left the model at 202 MB, because it skipped some weight tables, and WebGPU has no kernels for the integer convolution it produces. We wrote a weight-only int8 conversion instead, which stores weights as int8 and converts them back before each layer. That got the model to 68 MB with the same edge quality as the fp32 original.

## The licence trap

The best-scoring model in our reference run, BRIA's RMBG-2.0, is licensed CC BY-NC 4.0: its model card says it's released "for non-commercial use", and commercial use needs a separate agreement with BRIA ([RMBG-2.0 model card](https://huggingface.co/briaai/RMBG-2.0)). The older RMBG-1.4 has its own BRIA licence with a commercial purchase option too. Here's the catch: rembg itself is MIT-licensed, but its README lists `bria-rmbg` (RMBG-2.0) as **the default model**, and notes that model weights carry their own licences. So a product that installs rembg and calls it with no options ships a non-commercial model. If your app makes money, check which weights it loads, and pass the model name explicitly.

BEN2 is similar in a different way: its base model is MIT, but the page describes the stronger full model as available only through the company's own demo and API. BiRefNet (MIT), IS-Net and U²-Net (Apache-2.0) and ORMBG (Apache-2.0) are free to ship commercially, as long as you keep their licence notices.

We checked the projects' upkeep too, on 29 October 2026: BiRefNet's repository was last updated on 25 October 2026 and rembg's on 21 October 2026, while the IS-Net and U²-Net repositories were last updated in 2024. The older models still work, but nobody is improving them.

## Browser models vs the paid services

The main paid alternative's free tier is limited by size. remove.bg's free preview is capped at 0.25 megapixels, about 625 × 400 pixels ([remove.bg help](https://www.remove.bg/help/a/what-is-the-maximum-image-resolution-file-size)); full resolution, up to 50 megapixels, needs credits. A 12-megapixel phone photo has 48 times the pixels of that preview. A browser model returns the cut-out at full resolution, with no account, and the photo is never uploaded.

What the services still do better: batch processing of hundreds of images, very large images, and consistent speed on slow devices, since the work runs on their servers. For a product page or a profile photo, a good browser model is now on par for edges.

## Which to use

- **For a one-off photo:** our [background remover](/tools/photo/background-remover/) runs BiRefNet_lite on WebGPU and ORMBG otherwise. For a logo or a product on white, the simpler [white background remover](/tools/photo/remove-white-background/) is faster and keeps letter holes. For marketplace listings, the [product photo studio](/tools/photo/product-photo-studio/) adds a white background and padding. Compress the result before you upload it with the [image compressor](/tools/photo/image-compress/).
- **For your own app:** start with BiRefNet_lite (MIT) on WebGPU with an ORMBG fallback, check the licence of every weight file you load, and test on your users' hardest photos, not on a leaderboard.

## Sources

- Peng Zheng et al., [BiRefNet](https://github.com/ZhengPeng7/BiRefNet), "Bilateral Reference for High-Resolution Dichotomous Image Segmentation", CAAI Artificial Intelligence Research, 2024 (MIT licence).
- BRIA AI, [RMBG-2.0 model card](https://huggingface.co/briaai/RMBG-2.0) (CC BY-NC 4.0).
- PramaLLC, [BEN2 model card](https://huggingface.co/PramaLLC/BEN2); onnx-community, [ORMBG ONNX model card](https://huggingface.co/onnx-community/ormbg-ONNX).
- Xuebin Qin et al., [U²-Net](https://github.com/xuebinqin/U-2-Net) and [IS-Net (DIS)](https://github.com/xuebinqin/DIS) repositories; Daniel Gatis, [rembg](https://github.com/danielgatis/rembg) (README, model list and default model). Licences and last-commit dates from the GitHub API, 29 October 2026.
- Hugging Face, [Transformers.js: running models on WebGPU](https://huggingface.co/docs/transformers.js/guides/webgpu); Microsoft, [ONNX Runtime Web WebGPU execution provider](https://onnxruntime.ai/docs/tutorials/web/ep-webgpu.html).
- remove.bg, [maximum image resolution](https://www.remove.bg/help/a/what-is-the-maximum-image-resolution-file-size).
- Our benchmark: 8 CC0/CC-BY ground-truth cut-outs, rembg reference run and our browser pipeline (Chrome, WebGPU on an Apple M5 Mac), measured 22 October 2026.
