export interface Release {
    _id: string;
    name: string;
    description: string;
    version: string;
    date: string;
    status: string;
    week?: string;
    // applicationId: string;
}