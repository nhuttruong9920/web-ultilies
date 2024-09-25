const formatDateService = {
  getSecondsIn2010(value: Date): number {
    if (value) {
      return this.floatToInt(
        (value.getTime() - this.base2010DateTime().getTime()) / 1000
      );
    }
    return 0;
  },

  getDateIn2010(seconds: number): Date {
    const date = this.base2010DateTime();
    if (seconds === 0) {
      return date;
    }
    date.setSeconds(date.getSeconds() + seconds);
    return date;
  },

  base2010DateTime() {
    return new Date(2010, 0, 1, 0, 0, 0, 0);
  },

  floatToInt(value: number) {
    return Math.floor(value);
  },
};

export default formatDateService;
