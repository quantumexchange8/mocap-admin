const formatDateTime = (date, includeTime=true) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = new Date(date);

    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = months[formattedDate.getMonth()];
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

    if (includeTime) {
        return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${day} ${month} ${year}`;
    }
}

const formatDateOld = (date, includeTime=false) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = new Date(date);

    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = months[formattedDate.getMonth()];
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

    if (includeTime) {
        return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${day} ${month} ${year}`;
    }
}

const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const formatPoint = (amount) => {
    const num = Number(amount);
    if (isNaN(num)) return '0';
    return num.toLocaleString();
};

const formatDate = (date, includeTime = false) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();

    if (includeTime) {
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return `${day}/${month}/${year}`;
};


export {
    formatDateTime, 
    formatDate,
    formatAmount,
    formatPoint,
    formatDateOld,
};