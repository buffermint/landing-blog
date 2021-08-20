CMS.registerEditorComponent({
  // Internal id of the component
  id: "x-quote",
  // Visible label
  label: "Quote",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "quote", label: "Quote", widget: "string" },
    { name: "credit", label: "Person", widget: "string", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<x-quote(\s)*(credit="(.+?)")?>((.|\n)+?)<\/x-quote>/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      credit: match[3] || '',
      quote: match[4]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    let string = "";
    if (obj.quote) string = `<x-quote>${obj.quote}</x-quote>`;
    if (obj.quote && obj.credit)
      string = `<x-quote credit="${obj.credit}">${obj.quote}</x-quote>`;
    return string;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    let str = '';
    str = "<p>" + obj.quote + "</p>";
    if(obj.credit) str += "<strong>" + obj.credit + "</strong>"

    return '<hr/><center>'+ str +'</center><hr/>'
  },
});

CMS.registerEditorComponent({
  // Internal id of the component
  id: "x-image",
  // Visible label
  label: "Custom Image",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "url", label: "Image URL", widget: "file" },
    { name: "caption", label: "Caption", widget: "string", required: false },
    { name: "alt", label: "Alt", widget: "string", required: false },
    { name: "wide", label: "Full Width", widget: "boolean", default: true },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<x-image(\s)*(url="(.+?)")?(\s)*(caption="(.+?)")?(\s)*(alt="(.+?)")?(\s)*(wide="(.+?)")?><\/x-image>/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    console.log(match);
    return {
      url: match[3] || '',
      caption: match[6] || '',
      alt: match[9] || '',
      wide: match[12] || ''
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    let string = "<x-image";
    if (obj.url) string += ` url="${obj.url}"`;
    if (obj.caption) string += ` caption="${obj.caption}"`;
    if (obj.alt) string += ` alt="${obj.alt}"`;
    if (obj.wide) string += ` wide="${obj.wide}"`;
    string += `></x-image>`
    return string;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    let str = '';
    str = `<img src="${obj.url}" />`;
    if(obj.caption) str += `<p>${obj.caption}</p>`;
    return '<br/>' + str + '<br/>';
  },
});
