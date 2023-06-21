export default (webp) => {
    // Create a Uint8Array from the buffer
    const webpArray = new Uint8Array(webp);

    // Create a Blob from the Uint8Array
    const webpBlob = new Blob([webpArray], { type: 'image/webp' });

    // Create a URL object from the Blob
    const webpURL = URL.createObjectURL(webpBlob);

    return webpURL;
}