export function formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    });
    return formatter.format(value);
}