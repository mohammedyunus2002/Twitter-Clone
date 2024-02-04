import { useCallback, useState } from "react";

interface ImageUploadProps {
    onChange: (base64: string) => void; 
    label?: string,
    value?: string,
    disabled?: boolean,
}
const ImageUpload = ({
    onChange,
    label,
    value,
    disabled
}: ImageUploadProps) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]); 

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
    }, [])

    return ( 
        <div>
            
        </div>
    );
}
 
export default ImageUpload;