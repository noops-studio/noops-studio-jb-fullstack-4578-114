/**
 * Formats a date string into a localized format
 * @param dateString - ISO date string to format
 * @returns Formatted date string in Hebrew locale
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  /**
   * Converts a Date object to an ISO string format for datetime-local inputs
   * @param date - Date object to convert
   * @returns ISO string formatted for datetime-local input (YYYY-MM-DDTHH:MM)
   */
  export const dateToInputValue = (date: Date): string => {
    // Format: YYYY-MM-DDTHH:MM
    return date.toISOString().slice(0, 16);
  };
  
  /**
   * Checks if a date is valid
   * @param dateString - Date string to validate
   * @returns Boolean indicating if the date is valid
   */
  export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };
  
  /**
   * Checks if one date is after another
   * @param date1 - First date string
   * @param date2 - Second date string
   * @returns Boolean indicating if date1 is after date2
   */
  export const isDateAfter = (date1: string, date2: string): boolean => {
    if (!isValidDate(date1) || !isValidDate(date2)) {
      return false;
    }
    
    return new Date(date1) > new Date(date2);
  };