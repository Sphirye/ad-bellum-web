export default {
    required: (input: string) => (!!input || "Input required"),
    email: (input: string) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input) || "Invalid email"),
    snakeCase: (input: string) => (/^[a-z]+(_[a-z]+)*$/.test(input) || "Text must be snake case"),
    minLength: (minLength: number) => (input: string) => (!!input && input.length >= minLength || `Input must be at least ${minLength} characters`),
    noSpaces: (input: string) => (!/\s/.test(input) || `Input cannot contain spaces`)
}