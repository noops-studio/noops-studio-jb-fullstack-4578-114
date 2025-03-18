import { useEffect } from "react";

export default function setTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}