export interface OcrResult {
    ParsedResults: {
        TextOverlay: {
            Lines: [],
            HasOverlay: boolean
            Message: string;
        };
        TextOrientation: string;
        FileParseExitCode: number;
        ParsedText: string;
        ErrorMessage: string;
        ErrorDetails: string;
    }[];
    OCRExitCode: number;
    IsErroredOnProcessing: boolean;
    ProcessingTimeInMilliseconds: string;
}