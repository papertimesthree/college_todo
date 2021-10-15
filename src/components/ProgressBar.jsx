export default function ProgressBar() {
  let progressPercentage = 75;
  return (
    <div class="shadow w-full bg-grey-light mt-2">
      <div className="h-10 w-full bg-gray-300">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full ${
            progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <div className="text-white text-right ">{`${progressPercentage}%`}</div>
        </div>
      </div>
    </div>
  );
}
