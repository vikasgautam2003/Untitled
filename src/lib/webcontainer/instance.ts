import  { WebContainer } from '@webcontainer/api' 

let webcontainerInstance:  WebContainer | null = null;

export const getWebContainerInstance = async () => {

    if(webcontainerInstance) {
        return webcontainerInstance;
    }

    try {
        webcontainerInstance = await WebContainer.boot();
        return webcontainerInstance;
    } catch (error) {

        console.error("Failed to initialize WebContainer:", error);
        throw error;
    }
}