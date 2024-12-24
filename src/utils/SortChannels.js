export const filterObjectsTodayInClientTime = (objList) => {
        // Lấy ngày hiện tại của client
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        const filterCurrentDate = objList.filter(obj => {
            if (!obj.startTime) return false; // Bỏ qua nếu không có startTime

            // Chuyển startTime từ UTC sang giờ client
            const startTimeUTC = new Date(obj.startTime + "Z"); // "Z" để chỉ định UTC
            const clientTime = new Date(startTimeUTC.toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}));

            // So sánh ngày của client
            return (
                clientTime.getFullYear() === todayYear &&
                clientTime.getMonth() === todayMonth &&
                clientTime.getDate() === todayDate
            );
        });

        return filterCurrentDate.sort((a, b) => {
        if (a.isLive === b.isLive) {
            const timeA = new Date(a.startTime + "Z");
            const timeB = new Date(b.startTime + "Z");
            return timeA - timeB; // So sánh thời gian nếu cả hai có cùng isLive
        }
        return b.isLive - a.isLive; // isLive === true (1) lên trước isLive === false (0)
    });
    }