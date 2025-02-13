export class DateHelper {
  static addDate(
    date: Date,
    value: number,
    type: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ): Date {
    switch (type) {
      case 'daily':
        return this.addDays(date, value);
      case 'weekly':
        return this.addDays(date, value * 7);
      case 'monthly':
        return this.addMonths(date, value);
      case 'yearly':
        return this.addYears(date, value);
      default:
        return date;
    }
  }

  private static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  private static addMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  private static addYears(date: Date, years: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  }

  static removeTime(
    date: Date,
    value: number,
    type: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ): Date {
    switch (type) {
      case 'daily':
        return this.removeDays(date, value);
      case 'weekly':
        return this.removeDays(date, value * 7);
      case 'monthly':
        return this.removeMonths(date, value);
      case 'yearly':
        return this.removeYears(date, value);
      default:
        return date;
    }
  }

  private static removeDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  private static removeMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
  }

  private static removeYears(date: Date, years: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate;
  }
}
