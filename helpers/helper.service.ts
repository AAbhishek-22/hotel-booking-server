

module.exports = {
        /**
       * Remove properties from the given object that are not in the whitelist (in-place).
       * @param {object} obj - The object to filter.
       * @param {string[]} whitelist - The list of properties to keep.
       * @returns {object} The original object with only the whitelisted properties.
       */
        removeProperties: function(obj: any, whitelist: string[]): any {
            if (!obj || typeof obj !== 'object') {
                return {}; // Return an empty object if invalid input
            }
          for (const key of Object.keys(obj)) {
            if (whitelist.includes(key)) {
              delete obj[key];
            }
          }
          return obj;
        },

        /**
         * Stay Duration calculation function
         * @param {string} checkIn - The check-in date in ISO format.
         * @param {string} checkOut - The check-out date in ISO format.
         * @returns {string} The stay duration in days.
         */
  calculateStayDuration: function (checkIn: string, checkOut: string): string {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const stayDuration = `${daysDiff} days`;
    return stayDuration;
  },
}

export default module.exports;