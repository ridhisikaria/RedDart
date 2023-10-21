export interface IEvent {
    bcs: string;
    /**
     * Sequential event ID, ie (transaction seq number, event seq number). 1) Serves as a unique event ID
     * for each fullnode 2) Also serves to sequence events for the purposes of pagination and querying. A
     * higher id is an event seen later by that fullnode. This ID is the "cursor" for event querying.
     */
    txDigest: string;
    eventSeq: string;

    /** Move package where this event was emitted. */
    packageId: string;
    /** Parsed json value of the event */
    parsedJson: unknown;
    /** Sender's Sui address. */
    sender: string;
    /** UTC timestamp in milliseconds since epoch (1/1/1970) */
    timestamp?: string | null;
    /** Move module where this event was emitted. */
    transactionModule: string;
    /** Move event type. */
    eventType: string;
    network: string;
}