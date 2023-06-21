export default (timestamp) => {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Format the date
    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return formattedDate;
}