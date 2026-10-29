---
title: "Are online PDF converters safe? We watched where the file goes"
seo_description: "We picked the same PDF on six popular online PDF tools and logged every request. Most uploaded it within a second, before we pressed a button."
keyword: are online pdf converters safe
featured_image: assets/img/uploads/online-pdf-converters-safe-cover.jpeg
featured_thumbnail: assets/img/uploads/online-pdf-converters-safe-cover.jpeg
author: Rishabh Pandey
show_meta: true
section: postContent
published: true
date: 2026-10-29
extends: _layouts.post
---

"Is it safe to upload my payslip to a free PDF site?" The honest answer depends on two things you can check yourself: whether the file leaves your computer at all, and what happens to it if it does. Most articles answer with the sites' own promises ("files deleted after one hour"). We wanted to see the first part with our own eyes, so we watched the network traffic of six popular PDF tools while they compressed the same file.

## What we did

On 29 October 2026 we opened the "compress PDF" page of six well-known services and of our own tool in an automated Chromium browser at desktop size. We used no account and didn't click any cookie banner. On each site we:

1. loaded the page and waited five seconds;
2. picked the same test file, a 302.6 KB PDF of public-domain text that we generated for our benchmarks;
3. waited twelve seconds, then pressed the site's "Compress" button if it had one;
4. waited twenty more seconds, recording every request the page sent.

An upload shows up as a POST or PUT request about the size of the file (310,000 bytes or so). We logged when it started, counted from the moment the file was picked, and where it went. We also counted how many different servers the page talked to during the whole visit, which is a rough measure of how many third parties see you there.

## What we saw

| Service | File uploaded? | Upload started | Where it went | Servers contacted |
|---|---|---|---|---|
| iLovePDF | Yes | 1.0 s after choosing the file | `api99.ilovepdf.com` | 23 |
| Smallpdf | Yes | 2.5 s after choosing the file | a Cloudflare R2 storage bucket for Smallpdf's production files | 25 |
| PDF24 | Yes | 0.9 s after choosing the file | `filetools20.pdf24.org` | 13 |
| Sejda | Yes | 0.8 s after choosing the file | `www.sejda.com` | 2 |
| FreeConvert | Yes | after pressing Compress (14.3 s) | `s42-hzfi.freeconvert.com` | 224 |
| Adobe Acrobat online | Not tested: the site refused our automated browser | – | its servers, per Adobe | – |
| BufferMint (ours) | No | no upload | – | 2 |

*Measured 29 October 2026, headless Chromium, desktop, no consent given, one run per site. "Servers contacted" counts distinct host names over about 40 seconds.*

Three findings matter more than the table.

**Four of the five services we could test uploaded the file before we pressed anything.** On iLovePDF, PDF24, Sejda and Smallpdf, choosing the file was enough. The upload began in under three seconds, while the page still showed a "Compress" button. If you pick the wrong file by mistake (the scan of your passport instead of the menu) and then close the tab, it has already been sent. Only FreeConvert waited for the button.

**Where the file lands differs.** Sejda's page talked to two servers in total, both its own. Smallpdf sent the file straight to a cloud storage bucket. That's a normal design, and nothing we saw suggests it was misconfigured. But it's the same kind of storage involved in the largest documented leak of this kind (below), and the safety of your file then depends on how that bucket is set up.

**Some pages share your visit with far more companies than others.** FreeConvert's page contacted 224 different servers in 40 seconds, most of them advertising exchanges bidding for the ad space. That doesn't mean they received your file: our log shows the upload went only to FreeConvert's own server. It does mean many companies learn that someone visited a PDF converter from your connection. PDF24 contacted 13 servers, and Sejda 2.

## What the services promise

Every service we tested states a deletion policy. We read each one on the day of the test:

- **iLovePDF:** uploaded content is deleted within two hours of processing. Processing generally happens in the European Economic Area ([iLovePDF privacy policy](https://www.ilovepdf.com/help/privacy), last updated 19 February 2026).
- **Smallpdf:** files are deleted automatically after one hour, and transfers use TLS ([Smallpdf compress page](https://smallpdf.com/compress-pdf)).
- **PDF24:** files are deleted from its servers after one hour, and the servers are in Germany ([PDF24 compress page](https://tools.pdf24.org/en/compress-pdf)).
- **Sejda:** uploaded and processed files are permanently deleted after upload or processing respectively, with no backups ([Sejda privacy policy](https://www.sejda.com/privacy), effective 1 October 2026). The policy gives no exact time.
- **FreeConvert:** files are deleted automatically after 8 hours, and are stored with Amazon Web Services ([FreeConvert privacy policy](https://www.freeconvert.com/privacy)).
- **Adobe:** the file is handled by Adobe servers and deleted unless you sign in to save it ([Adobe Acrobat online, compress PDF](https://www.adobe.com/acrobat/online/compress-pdf.html)).

These are reasonable policies, and we have no evidence that any of these services breaks them. But a policy is a promise about what happens after the upload. It can't make a leak impossible, and you can't check it from the outside.

## When the promise fails

In July 2024, researchers at Cybernews found two online PDF tools, PDF Pro and Help PDF, apparently run by the same UK company, with their cloud storage open to anyone. **89,062 uploaded files** were exposed, 87,818 of them from PDF Pro. The documents included passports, driving licenses, certificates and contracts. Cybernews said the operators didn't respond to repeated contact, and the files were still exposed when the story ran ([BGR, 11 July 2024](https://bgr.com/tech/online-pdf-converters-leaked-thousands-of-user-uploaded-documents/); [Cybernews](https://cybernews.com/security/online-pdf-maker-leaks-user-documents/)).

Those weren't the big names in our table. But they looked like any other converter, ranked in search, and had a privacy page. A user had no way to tell the difference before uploading.

The general lesson: once a file is on someone else's server, its safety depends on their storage settings, their staff and their deletion jobs. Deleting after one hour narrows the window, and a leaked bucket of one-hour files still holds an hour of everyone's documents.

## How a tool can work without uploading

Browsers can read a file you pick and process it on your own computer. A page gets a `File` object from the file picker or a drag and drop, reads it into memory, and only sends it somewhere if the developer writes code to do that ([MDN, using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)). PDF compression, merging, splitting and even OCR can all run this way in a modern browser. Server-side tools do have real advantages: some conversions, Word to PDF with exact layout for example, need software that's hard to run in a browser.

This is how our [PDF tools](/tools/pdf/) work. In the test above, our compress page made no upload request, and over the whole visit it talked to two servers: buffermint.com itself and Cloudflare's web analytics script (Cloudflare hosts the site). We built them that way because many of the files people compress are exactly the documents you'd least want on a stranger's server.

## The two-minute check you can run on any tool

You don't need to trust our table, or any site's promise. Here's how to check a tool yourself in Chrome, Edge or any Chromium browser. Firefox has the same Network panel, with slightly different labels (its filter is "XHR" and the upload body is under "Request").

**Check 1: watch the network.**
1. Open the tool's page and press F12 (or right-click → Inspect). Go to the **Network** tab.
2. Click the **Fetch/XHR** filter, and right-click a column header to add the **Method** column ([Chrome DevTools network reference](https://developer.chrome.com/docs/devtools/network/reference)).
3. Pick a harmless test file of a known size, not your real document.
4. Watch for a POST or PUT request that appears right after you pick the file. Click it and open the **Payload** tab. If you see your file name or "(binary)", the file was sent.

**Check 2: pull the plug.**
1. Load the tool and run it once on a harmless file. Some in-browser tools download their processing code the first time you use them.
2. Now go offline: turn off Wi-Fi, or in DevTools choose **Offline** in the throttling menu (Chrome docs, "Emulate offline").
3. Run the tool again. If it still works, the processing happened on your computer.

Neither check is perfect. A page could upload later, or only for some file types. But together they catch the common case in two minutes.

## What we'd do with sensitive documents

- **Contracts, IDs, payslips, medical letters:** use a tool that passes both checks above, or desktop software. If you must use an upload service, use one that names its storage location and deletion time, and delete the file yourself afterwards if it offers a button.
- **Before sharing a PDF, strip what you don't mean to share.** A black box drawn over text can leave the words underneath in the file. Use a real redaction tool such as [Redact PDF](/tools/pdf/redact-pdf/), which removes the text. Then open the result and try to select the hidden words.
- **Photos have their own leak:** phone photos carry GPS coordinates in their EXIF data. Strip it with the [EXIF remover](/tools/photo/exif-stripper/) before you send a photo of a document or your home.
- **Sending a PDF by email?** [Protect PDF](/tools/pdf/protect-pdf/) adds a password, and you can send the password through a different channel.
- **Pick the file last.** Since most sites upload on selection, read the page, choose the settings, and only then pick the file. Double-check it's the right one before you let go of the mouse.

Same task, same file: whether it leaves your computer is the difference that matters, and you can check it yourself in two minutes.

## Sources

- Our test: headless Chromium (Playwright) on 29 October 2026, one run per site, the request log kept on our side.
- iLovePDF: [Privacy policy](https://www.ilovepdf.com/help/privacy) (last updated 19 February 2026).
- Smallpdf: [Compress PDF page, security section](https://smallpdf.com/compress-pdf).
- PDF24: [Compress PDF page, security section](https://tools.pdf24.org/en/compress-pdf).
- Sejda: [Privacy policy](https://www.sejda.com/privacy) (effective 1 October 2026).
- FreeConvert: [Privacy policy](https://www.freeconvert.com/privacy).
- Adobe: [Acrobat online compress PDF](https://www.adobe.com/acrobat/online/compress-pdf.html).
- BGR: [Online PDF converters leaked thousands of user-uploaded documents](https://bgr.com/tech/online-pdf-converters-leaked-thousands-of-user-uploaded-documents/) (11 July 2024), reporting Cybernews research.
- Cybernews: [Online PDF maker leaks user-uploaded documents](https://cybernews.com/security/online-pdf-maker-leaks-user-documents/) (July 2024).
- MDN: [Using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications).
- Chrome for Developers: [Network features reference](https://developer.chrome.com/docs/devtools/network/reference).
