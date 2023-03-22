export class Bull {
    tokenAdapter;
    constructor(tokenAdapter) {
        this.tokenAdapter = tokenAdapter;
    }
    /**
     * bsmethod
     */
    bsmethod() {
        console.log(this.tokenAdapter.secretKey());
    }
}
