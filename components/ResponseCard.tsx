interface Props {
  result: string;
}

export default function ResponseCard({ result }: Props) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h3>Model Response</h3>
      <p>{result}</p>
    </div>
  );
}