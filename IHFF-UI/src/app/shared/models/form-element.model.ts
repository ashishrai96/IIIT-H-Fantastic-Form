export interface FormElement {
    questionId: string | undefined;
    type: number;
    question: string;
    description: string;
    answer: string | string[];
    required: boolean;
    validations?: { rule: string, value1: string, value2?: string };
    isMultiChoice?: boolean;
    choices?: string[];
    statements?: string[];

    editMode?:boolean;
}

/**
 * For Input Type -> 
 *  "answer" will be string
 * 
 * For Checkbox/RadioButton -> 
 *  "choices" has all the options, 
 *  "answer" will have array of strings
 * 
 * For Likert Scale -> 
 *  "choices" will top row options value, 
 *  "statements" will have left most column statements, 
 *  "answer" will be array of strings serially having choices for statements!
 */