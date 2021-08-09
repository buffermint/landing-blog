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
  pattern: /^x\-quote (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1],
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
    return "<p>" + obj.quote + "</p>";
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
    { name: "caption", label: "Caption", widget: "string" },
    { name: "alt", label: "Alt", widget: "string" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^x\-image (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1],
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    let string = "";
    if (obj.url) string = `<x-image url="${obj.url}" />`;
    if (obj.url && obj.caption)
      string = `<x-image caption="${obj.caption}" url="${obj.url}" />`;

    if (obj.url && obj.caption && obj.alt)
      string = `<x-image alt="${obj.alt}" caption="${obj.caption}" url="${obj.url}" />`;

    return string;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return `<img src="${obj.url}" />`;
  },
});
