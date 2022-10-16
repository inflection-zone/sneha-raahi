import { addToast } from '$lib/components/toast/toast.store';

export const showMessage = (
    message: string,
    type: string,
    dismissible = true,
    timeout = 3500) => {
    addToast({
        message: message,
        type: type,
        dismissible: dismissible,
        timeout: timeout
    });
}

export const show = (data) => {
    let messageType: "success" | "error" = null;
    let messageText = '';
    const flashMessage = data? data['flash'] : null;
    if (flashMessage) {
      messageType = flashMessage?.type;
      messageText = flashMessage?.message;
      console.log(`Layout svelte...${JSON.stringify(flashMessage, null, 2)}`);
      showMessage(messageText, messageType);
    }
};

//let types = ["success", "error", "info"];
