/* eslint-disable @typescript-eslint/no-explicit-any */
export async function featureEngineering(txs: any[], address: `0x${string}`) {
  if (!txs || txs.length === 0) {
    return {
      Sent_tnx: 0,
      Received_tnx: 0,
      Avg_min_between_sent_tnx: 0,
      Avg_min_between_received_tnx: 0,
      Time_Diff_between_first_and_last: 0,
      Unique_Sent_To_Addresses: 0,
      Unique_Received_From_Addresses: 0,
      Min_Val_Sent: 0,
      Max_Val_Sent: 0,
      Avg_Val_Sent: 0,
      Min_Value_Received: 0,
      Max_Value_Received: 0,
      Wallet_Age_Days: 0,
      Failed_Tx_Ratio: 0,
      Contract_Interaction_Ratio: 0,
      Spike_Ratio: 0,
    };
  }

  const addr = address.toLowerCase();

  const sentTx = txs.filter((tx) => tx.from?.toLowerCase() === addr);
  const receivedTx = txs.filter((tx) => tx.to?.toLowerCase() === addr);

  const sortedTxs = [...txs].sort(
    (a, b) => Number(a.timeStamp) - Number(b.timeStamp)
  );

  sentTx.sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));
  receivedTx.sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));

  /* ---------------- TIME FEATURES ---------------- */

  const sentDiffs: number[] = [];
  for (let i = 1; i < sentTx.length; i++) {
    sentDiffs.push(
      (Number(sentTx[i].timeStamp) - Number(sentTx[i - 1].timeStamp)) / 60
    );
  }

  const receivedDiffs: number[] = [];
  for (let i = 1; i < receivedTx.length; i++) {
    receivedDiffs.push(
      (Number(receivedTx[i].timeStamp) - Number(receivedTx[i - 1].timeStamp)) /
        60
    );
  }

  const Avg_min_between_sent_tnx =
    sentDiffs.length > 0
      ? sentDiffs.reduce((a, b) => a + b, 0) / sentDiffs.length
      : 0;

  const Avg_min_between_received_tnx =
    receivedDiffs.length > 0
      ? receivedDiffs.reduce((a, b) => a + b, 0) / receivedDiffs.length
      : 0;

  const Time_Diff_between_first_and_last =
    (Number(sortedTxs[sortedTxs.length - 1].timeStamp) -
      Number(sortedTxs[0].timeStamp)) /
    60;

  /* ---------------- VALUE FEATURES ---------------- */

  const sentValues = sentTx.map((tx) => Number(tx.value) / 1e18);
  const receivedValues = receivedTx.map((tx) => Number(tx.value) / 1e18);
  const allValues = txs.map((tx) => Number(tx.value) / 1e18);

  const Min_Val_Sent = sentValues.length > 0 ? Math.min(...sentValues) : 0;
  const Max_Val_Sent = sentValues.length > 0 ? Math.max(...sentValues) : 0;
  const Avg_Val_Sent =
    sentValues.length > 0
      ? sentValues.reduce((a, b) => a + b, 0) / sentValues.length
      : 0;

  const Min_Value_Received =
    receivedValues.length > 0 ? Math.min(...receivedValues) : 0;

  const Max_Value_Received =
    receivedValues.length > 0 ? Math.max(...receivedValues) : 0;

  /* ---------------- NEW ADVANCED FEATURES ---------------- */

  // 1️⃣ Wallet Age (Days)
  const Wallet_Age_Days =
    (Date.now() / 1000 - Number(sortedTxs[0].timeStamp)) / (60 * 60 * 24);

  // 2️⃣ Failed Transaction Ratio
  const failedTxCount = txs.filter(
    (tx) => tx.isError === "1" || tx.txreceipt_status === "0"
  ).length;

  const Failed_Tx_Ratio = failedTxCount / txs.length;

  // 3️⃣ Contract Interaction Ratio
  const contractTxCount = txs.filter(
    (tx) =>
      tx.to &&
      tx.to !== "" &&
      tx.to !== "0x0000000000000000000000000000000000000000" &&
      tx.input &&
      tx.input !== "0x"
  ).length;

  const Contract_Interaction_Ratio = contractTxCount / txs.length;

  // 4️⃣ Spike Ratio (Max / Avg value)
  const avgAllValue = allValues.reduce((a, b) => a + b, 0) / allValues.length;

  const Spike_Ratio =
    avgAllValue > 0 ? Math.max(...allValues) / avgAllValue : 0;

  /* ---------------- FINAL FEATURE OBJECT ---------------- */

  return {
    Sent_tnx: sentTx.length,
    Received_tnx: receivedTx.length,

    Avg_min_between_sent_tnx,
    Avg_min_between_received_tnx,
    Time_Diff_between_first_and_last,

    Unique_Sent_To_Addresses: new Set(sentTx.map((tx) => tx.to)).size,
    Unique_Received_From_Addresses: new Set(receivedTx.map((tx) => tx.from))
      .size,

    Min_Val_Sent,
    Max_Val_Sent,
    Avg_Val_Sent,

    Min_Value_Received,
    Max_Value_Received,

    Wallet_Age_Days,
    Failed_Tx_Ratio,
    Contract_Interaction_Ratio,
    Spike_Ratio,
  };
}
