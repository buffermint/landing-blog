---
title: "HEIC to JPG: when to convert and what you lose, measured"
seo_description: "We converted five HEIC photos to JPG at five quality settings: file sizes, SSIM, what an HDR iPhone photo drops, and which upload forms still refuse HEIC."
keyword: heic to jpg
featured_image: assets/img/uploads/heic-to-jpg-cover.jpeg
featured_thumbnail: assets/img/uploads/heic-to-jpg-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-30
extends: _layouts.post
---

An iPhone saves photos as HEIC unless you tell it not to. That's fine on the phone and in iCloud, but sooner or later an upload form, a Windows laptop or a browser refuses the file, and you need a JPG. Most guides stop at "use a converter". The questions people actually have are: does the JPG look worse, why is it bigger, what disappears in the conversion, and which sites still need it at all?

We built a [HEIC to JPG converter](/tools/files/heic-to-jpg/) that runs in the browser, so we had the pieces to measure this ourselves. This post shares those numbers, plus a table of what ten services, forms and programs accept, each taken from their own help pages as of October 2026.

## What HEIC is, in two paragraphs

HEIC is an image saved in the HEIF container with the HEVC (H.265) video codec doing the compression. HEIF is an ISO standard (ISO/IEC 23008-12), and it can hold far more than one picture: Nokia's technical overview lists image sequences, thumbnails, Exif and XMP metadata, grids that rebuild one large image from tiles, and "auxiliary images" such as an alpha plane or a depth map ([Nokia HEIF technical overview](https://nokiatech.github.io/heif/technical.html)). A JPG holds one image and its metadata.

iPhone 7 and later can shoot HEIC; Apple calls the setting High Efficiency. Its support page says HEIF and HEVC use less storage "while preserving the same visual quality" as JPEG and H.264, and that you can switch new photos to JPEG under Settings > Camera > Formats > Most Compatible ([Apple Support, updated 5 December 2025](https://support.apple.com/en-us/HT207022)).

## Who still refuses HEIC (October 2026)

The short answer: big photo and shop platforms now accept HEIC, while browsers other than Safari and many government and business forms still don't.

| Where | HEIC accepted? | What the page says (as of October 2026) |
|---|---|---|
| Google Photos | Yes | .heic and .heif listed; photos up to 200 MB or 200 MP ([Google Photos Help](https://support.google.com/photos/answer/6193313?hl=en)) |
| Etsy listing photos | Yes | .jpg, .gif, .png, .svg or .heic; files over 1 MB "may not finish uploading" ([Etsy Help](https://help.etsy.com/hc/en-us/articles/115015663347-How-to-Add-Photos-and-Videos-to-Your-Listings)) |
| Shopify product images | Yes | HEIC listed with TIFF, BMP, GIF, SVG and WebP; under 20 MB, up to 25 MP ([Shopify Help Center](https://help.shopify.com/en/manual/products/product-media/product-media-types)) |
| eBay listing photos | Yes | JPEG, PNG, GIF, TIFF, BMP, WEBP, HEIC or AVIF; 12 MB per file ([eBay Help](https://www.ebay.com/help/selling/listings/adding-pictures-listings?id=4148)) |
| US passport renewal online | Yes | JPG, JPEG, PNG, HEIC or HEIF, 54 KB to 10 MB ([US Department of State](https://travel.state.gov/en/passports/renew-replace/online/upload-digital-photo.html)) |
| US visa photo | **No** | JPEG only, at most 240 kB, square, 600 to 1200 px, sRGB ([US Department of State](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html)) |
| LinkedIn Page images | **No** | "All images must be PNG or JPEG files", up to 3 MB ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/a563309)) |
| UK passport online | Not stated | Format not named; 50 KB to 10 MB, at least 600 × 750 px ([GOV.UK](https://www.gov.uk/photos-for-passports)) |
| Chrome, Edge, Firefox | **No** | No version displays HEIC in a web page; Safari 17 and later do, about 17% of users ([Can I use](https://caniuse.com/heif)) |
| Windows Photos | With add-ons | Needs HEIF Image Extensions (free) and HEVC Video Extensions ($0.99) from the Microsoft Store ([Microsoft Support](https://support.microsoft.com/en-us/windows/photos-app-video-editor-error-can-t-view-this-file-type-173ae0be-2b7d-d413-589e-84ccca0de02e)) |

Two things stand out. The same department, the US State Department, takes HEIC for a passport renewal and refuses it for a visa photo. And the browser row explains most refusals: a form that shows your photo back to you, or to a reviewer in Chrome, would have to convert it on its server first. [Can I use](https://caniuse.com/heif) attributes the slow adoption to HEIC being "complex and expensive to license", since the codec underneath is HEVC. So the cheap choice for a site is to say "JPEG or PNG only".

## What we measured

We took five HEIC files we're allowed to use and publish numbers on:

- **An iPhone 13 Pro photo** (1512 × 850, iOS 17.6.1, Display P3, with an HDR gain map), published under the MIT license by the [apple-hdr-heic](https://github.com/johncf/apple-hdr-heic) project as its test sample.
- **Three 12-megapixel photos** (4000 × 3000, the size iPhones saved by default before the iPhone 15, whose main camera now saves 24 MP) encoded by Apple's own HEIC encoder (macOS `sips`, quality 80) from public-domain NASA photos: the Apollo 11 photo on our cover in two different crops, and the Apollo 17 "Blue Marble".
- **The libheif example image** (1280 × 854), from the [libheif](https://github.com/strukturag/libheif) project, the open-source decoder most HEIC converters use.

Each file was decoded once with libheif 1.23.5 (the same WebAssembly build our converter ships), then saved as JPG with MozJPEG at quality 60, 75, 85, 92 (our default) and 100, using our tool's encoder settings. Sizes are the image data alone; our converter also writes the EXIF details and color profile, usually a few KB more. We scored each JPG with SSIM against the decoded HEIC, using FFmpeg 8.0 on all three color channels. SSIM is a similarity score where 1.0 means identical. Sizes are in KB of 1,000 bytes. The run was on 30 October 2026.

## Results: size and similarity

| Photo | HEIC | JPG q75 | JPG q85 | JPG q92 | JPG q100 | PNG |
|---|---|---|---|---|---|---|
| iPhone 13 Pro, 1.3 MP | 239 KB | 130 KB (0.967) | 184 KB (0.976) | 280 KB (0.989) | 721 KB (0.999) | 1,260 KB |
| Apollo 11, 12 MP | 1,095 KB | 904 KB (0.983) | 1,269 KB (0.989) | 1,857 KB (0.994) | 4,965 KB (0.999) | 11,241 KB |
| Blue Marble, 12 MP | 940 KB | 762 KB (0.987) | 1,093 KB (0.993) | 1,559 KB (0.996) | 3,881 KB (0.999) | 8,323 KB |
| Apollo 11, portrait crop, 12 MP | 1,082 KB | 859 KB (0.979) | 1,251 KB (0.985) | 1,809 KB (0.994) | 4,879 KB (0.999) | 11,196 KB |
| libheif example, 1.1 MP | 718 KB | 217 KB (0.946) | 319 KB (0.969) | 475 KB (0.985) | 1,150 KB (0.999) | 1,871 KB |

*SSIM against the decoded HEIC in brackets. PNG is lossless, so its SSIM is 1.0. Quality 60, not shown, gave 0.22 to 0.60 times the HEIC size at SSIM 0.919 to 0.976.*

![Three side-by-side crops of the same patch of the Apollo 11 photo, enlarged: the decoded HEIC, the quality 75 JPG with smoother grain, and the quality 92 JPG that matches the original](/assets/img/uploads/heic-to-jpg-quality-compare.jpeg)

*Left to right, separated by white gaps: the decoded HEIC, JPG quality 75, JPG quality 92 (a 400 × 300 px patch of the Apollo 11 photo, NASA, public domain, enlarged 1.3 times). At 75 the lunar soil loses some grain; at 92 we couldn't tell it from the original.*

What this says:

1. **At a quality you'd keep, the JPG is bigger.** For the three Apple-encoded 12 MP photos, quality 92 gave files 1.66 to 1.70 times the HEIC size, and quality 85 gave 1.16 times. Only around quality 75 did those three come out smaller than the HEIC (the smaller iPhone sample was already smaller at 85), and enlarged, that setting visibly smooths fine grain (see the crops above).
2. **The size depends on how the HEIC was saved, not only on the format.** The libheif example is a high-quality HEIC (718 KB for 1.1 MP), so every JPG below quality 100 is smaller than it. "JPG is always twice the size" isn't true; it depends on the source.
3. **Quality 100 is almost never worth it.** It took the four Apple-encoded files to 3.0 to 4.5 times the HEIC size (the libheif example to 1.6 times) for an SSIM gain from 0.989–0.996 to 0.999 that we couldn't see.
4. **The jump from 85 to 92 is partly color.** At 92 and above, the encoder keeps color at full resolution (4:4:4, checked in the files' headers); below 90 it stores color at reduced resolution. That's part of why the files grow by 43 to 52% between those two settings.
5. **PNG is the wrong "lossless" choice for photos.** It came out 2.6 to 10.4 times the HEIC size and gets you nothing a quality-92 JPG doesn't, unless you plan to edit and resave the picture many times.

## Where the sources disagree on size

Apple's page says HEIF keeps "the same visual quality" in less space, without a number. [Nokia's overview](https://nokiatech.github.io/heif/technical.html) reports that JPEG needed on average 139% more bitrate, about 2.39 times the file size, for the same objective quality as HEVC. Our conversions of the four Apple-encoded files came out at 1.2 to 1.7 times the HEIC at quality 92.

These don't contradict each other. Nokia compared both codecs against the same uncompressed original at equal quality scores. We measured something else: re-saving an already compressed HEIC as JPG, scored against the HEIC itself, at a fixed JPEG quality setting that isn't tied to any quality score. A conversion can't recover detail the HEIC already dropped, and a JPEG "92" isn't the same visual level as an HEIC "80". For the reader the practical number is ours: budget 1.2 to 1.7 times the space when you convert at a quality you'd keep.

## What a JPG can't carry

The pixels are only part of an iPhone photo. Reading our iPhone 13 Pro sample with ExifTool shows what else is in the file:

- **An HDR gain map.** The sample carries a second, 756 × 426 image (about half the main size) of type `urn:com:apple:photo:2020:aux:hdrgainmap`, plus Apple's HDR headroom values. The [apple-hdr-heic](https://github.com/johncf/apple-hdr-heic) project describes the gain map as "an inverse tone-map": on an HDR screen it brightens highlights beyond the normal image. A standard JPG converter, ours included, writes only the main image, so the photo looks the same on an ordinary screen and loses its extra brightness on an HDR one.
- **Tiles.** The main image is stored as 512 × 512 tiles that the decoder stitches together. In our sample, the 1512 × 850 picture is a grid of six tiles. Old decoders are where conversions go wrong: our first version used heic2any, built on a 2020-era libheif, and scored 0.870 SSIM against Apple's own decode on the 12 MP test photos in our October benchmark, where Apple's own JPG export scored 0.996. After we moved to libheif 1.23 our JPGs of the same photos scored 0.994 and 0.997, and a real tiled Apple HEIC decodes at 0.999. If a tool gives you a blocky, cropped or off-color JPG, an outdated decoder is the first thing to suspect.
- **Depth and other auxiliary images.** HEIF can store a depth map next to the photo (Nokia's overview names it as an example of an auxiliary image). A JPG has nowhere to put it.
- **Wide color.** The sample is tagged Display P3. A careful converter copies that color profile into the JPG so colors stay the same; a careless one drops it and colors look slightly duller. The US visa page asks for sRGB, so a P3-tagged JPG isn't strictly what it asks for. We haven't tested whether that portal rejects one.
- **Location.** Exif data, including GPS, can be copied into the JPG. Our converter keeps the date taken and removes the location by default. If you use another tool, check the result with an [EXIF viewer](/tools/photo/exif-viewer/) or clean it with the [EXIF stripper](/tools/photo/exif-stripper/) before you post it anywhere public.

## A worked example: the 240 KB visa photo

The visa row in the table is the strict one: JPEG, square, 600 to 1200 px, at most 240 kB. We took the 12 MP Apollo 11 photo, cropped it square and resized it, then saved it at four of the quality settings:

| Size | q75 | q85 | q92 | q100 |
|---|---|---|---|---|
| 1200 × 1200 | 172 KB ✔ | 257 KB ✘ | 448 KB ✘ | 1,356 KB ✘ |
| 600 × 600 | 57 KB ✔ | 84 KB ✔ | 139 KB ✔ | 428 KB ✘ |

So the order matters: crop and resize first, then convert. A full-size quality-92 JPG of this photo is about 1.9 MB, nearly eight times over the limit. At 600 × 600 even quality 92 fits with room to spare, and at 1200 × 1200 you have to drop to about 75. Our [passport photo maker](/tools/photo/passport-photo-maker/) crops to the official pixel sizes, and [crop image to square](/tools/photo/crop-image-to-square/) plus [resize image](/tools/photo/resize-image/) do it by hand. A face is less forgiving than a moon landscape, so check the result at 100% before you upload.

## When to convert, and how

- **Don't convert your library.** Google Photos and iCloud keep HEIC as it is, and the HEIC is the smaller, better copy. Convert at the moment a form or person needs a JPG.
- **Use quality 85 to 92 for anything people will look at.** In our run, 92 kept SSIM at 0.989 or higher on every Apple-encoded file. Use 85 when size matters more and 75 only to squeeze under a limit.
- **Resize before you convert for upload limits.** A form with a KB limit almost never needs 12 MP. If you have a hard target, [compress image to 100 KB](/tools/photo/compress-image-to-100kb/) searches for the quality that fits.
- **Choose PNG only for editing.** For a screenshot or a graphic with sharp edges, the [HEIC to PNG](/tools/files/heic-to-png/) route is lossless. For a photo it just makes a much bigger file.
- **Stop the problem at the source if you often need JPG.** On the iPhone, Settings > Camera > Formats > Most Compatible saves new photos as JPEG. [Apple also notes](https://support.apple.com/en-us/HT207022) that photos you send by AirDrop, Messages or mail "might" be converted automatically, and that photos imported to a computer over USB may be too, unless you choose Keep Originals under Settings > Apps > Photos.
- **On Windows, add the extensions.** [Microsoft's answer](https://support.microsoft.com/en-us/windows/photos-app-video-editor-error-can-t-view-this-file-type-173ae0be-2b7d-d413-589e-84ccca0de02e) is the free HEIF Image Extensions plus the $0.99 HEVC Video Extensions; after that the Photos app opens HEIC directly.
- **Mind where the file goes.** A HEIC photo can carry your home's coordinates. A converter that runs in the browser, like ours, never uploads the picture. Our post on [whether online converters are safe](/articles/are-online-pdf-converters-safe) shows how to check any tool in two minutes with the browser's network panel.

## How we'd sum it up

HEIC to JPG costs you three things: some space (about 1.2 to 1.7 times for a typical phone HEIC at a quality you'd keep), a generation of compression that's invisible at quality 92, and everything beyond the main picture: the HDR gain map, depth, and the location unless you choose to keep it. Convert copies when a form needs them, size them for the form, and keep the HEIC originals.

## Sources

- Apple Support: [Using HEIF or HEVC media on Apple devices](https://support.apple.com/en-us/HT207022) (updated 5 December 2025).
- Nokia Technologies: [HEIF technical information](https://nokiatech.github.io/heif/technical.html) (structure, auxiliary images, JPEG vs HEVC bitrate comparison).
- Can I use: [HEIF/HEIC image format](https://caniuse.com/heif) (browser support, read 30 October 2026).
- Microsoft Support: [Photos app Video Editor error: Can't view this file type](https://support.microsoft.com/en-us/windows/photos-app-video-editor-error-can-t-view-this-file-type-173ae0be-2b7d-d413-589e-84ccca0de02e).
- Google Photos Help: [supported file types and sizes](https://support.google.com/photos/answer/6193313?hl=en).
- Etsy Help: [How to add photos and videos to your listings](https://help.etsy.com/hc/en-us/articles/115015663347-How-to-Add-Photos-and-Videos-to-Your-Listings).
- Shopify Help Center: [Product media types](https://help.shopify.com/en/manual/products/product-media/product-media-types).
- eBay Help: [Adding pictures to your listings](https://www.ebay.com/help/selling/listings/adding-pictures-listings?id=4148).
- US Department of State: [Upload a digital photo for online passport renewal](https://travel.state.gov/en/passports/renew-replace/online/upload-digital-photo.html) and [visa photo digital image requirements](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html).
- LinkedIn Help: [Page and Career Page image requirements](https://www.linkedin.com/help/linkedin/answer/a563309).
- GOV.UK: [Photos for passports](https://www.gov.uk/photos-for-passports).
- strukturag: [libheif](https://github.com/strukturag/libheif) (HEIF and AVIF decoder and encoder, LGPL).
- johncf: [apple-hdr-heic](https://github.com/johncf/apple-hdr-heic) (converts iPhone HDR gain-map photos; source of the MIT-licensed iPhone 13 Pro test photo).
- Our measurements: libheif 1.23.5 and MozJPEG (jSquash) on 30 October 2026, SSIM with FFmpeg 8.0; the HEIC test files are NASA public-domain photos (AS11-40-5903, AS17-148-22727) encoded with macOS `sips`, the apple-hdr-heic sample and the libheif example.
