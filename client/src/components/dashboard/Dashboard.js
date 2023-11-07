import Achievments from "./Achievments";
import CardGraph from "./CardGraph";
import TransactionsBoth from "./TransactionsBoth";

function Dashboard() {
  return (
    <>
      <CardGraph type="dash" />
      <TransactionsBoth />
      <Achievments />
    </>
  );
}

export default Dashboard;
