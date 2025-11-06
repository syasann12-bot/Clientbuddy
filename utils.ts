export const fileToBase64 = (file: File): Promise<{ data: string, mimeType: string, preview: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // result is "data:image/jpeg;base64,LzlqLzRBQ..."
            // we need to strip the prefix for the data part
            const base64Data = result.split(',')[1];
            // and get the mimeType from the prefix
            const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
            
            if (base64Data && mimeType) {
                // Return the original data URL as preview
                resolve({ data: base64Data, mimeType, preview: result });
            } else {
                 reject(new Error("Failed to parse file data."));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};