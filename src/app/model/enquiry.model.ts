export interface EnquiryModel {
    enquiryId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    message: string;
    categoryId: number;
    statusId: number;
    enquiryType: 'General' | 'Technical' | 'Sales' | 'Support';
    isConverted: boolean;
    enquiryDate: string;
    followUpDate: string;
    feedback?: string;
}

export interface IStatus {
    statusId: number;
    statusName: string;
    isActive: boolean;
}
export interface ICategory {
    categoryId: number;
    categoryName: string;
    isActive: boolean;
}

export interface ICategoryResponse {
    error: any[];
    result: boolean;
    data: ICategory[];
    message: string;
}
export interface IStatusResponse {
    error: any[];
    result: boolean;
    data: IStatus[];
    message: string;
}