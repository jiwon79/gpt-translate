declare global {
  interface String {
    isBlank(): boolean,
  }
}

String.prototype.isBlank = function() {
  return (this.length === 0 || !this.trim());
};

export {};
