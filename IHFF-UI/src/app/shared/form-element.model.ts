export interface FormElement {
    question: string;
    description: string;
    answer: string;
    required: boolean;
    validations?: { rule: string, value1: string, value2?: string };

    editMode?:boolean;
}
