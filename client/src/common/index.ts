import { format } from "date-fns";

export function formatDate(dateString: string) {
  // Chuyển đổi chuỗi ngày thành đối tượng Date
  const date = new Date(dateString);

  // Sử dụng date-fns để định dạng ngày tháng năm
  return format(date, "dd/MM/yyyy"); // Định dạng 'dd/MM/yyyy' cho ngày/tháng/năm
}
