const emptyValidator = (input: string): [boolean, string] => {
    if (input === "" || input == null) return [false, "Please fill in this field."];

    return [true, ""]
}

export { emptyValidator }