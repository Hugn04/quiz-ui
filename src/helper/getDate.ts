const getDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();

    // Lấy thông tin ngày
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên +1
    const day = date.getDate();

    // Lấy giờ phút
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Kiểm tra nếu là hôm nay
    if (year === now.getFullYear() && month === now.getMonth() + 1 && day === now.getDate()) {
        return `${hours}:${minutes}`;
    } else {
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
};

export default getDate;
