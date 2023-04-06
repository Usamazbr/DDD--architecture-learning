class PaginationOptions {
  constructor(private currentPage = 1, private perPage = 20) {}

  limit() {
    return this.perPage;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  offset() {
    return (this.currentPage - 1) * this.limit();
  }
}

module.exports = {
  PaginationOptions
};

