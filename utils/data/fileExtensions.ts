interface ExtensionOptions {
    label: string;
    value: string;
}

const EXTENSIONS: ExtensionOptions[] = [
    {
        label: "Python source code file (.py)",
        value: "py"
    },
    {
        label: "PowerPoint presentation (.pptx)",
        value: "pptx"
    },
    {
        label: "Portable Document Format (.pdf)",
        value: "pdf"
    },
    {
        label: "Microsoft Word Document (.docx)",
        value: "docx"
    },
    {
        label: "Word Document (.doc)",
        value: "doc"
    },
    
]

export { EXTENSIONS }