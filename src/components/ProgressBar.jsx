export default function ProgressBar({ progressPercentage }) {
  return (
    <div className="shadow w-full bg-grey-light mt-2 rounded-lg overflow-hidden">
      <div className="h-10 w-full bg-gray-300">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full bg-gradient-to-r from-blue-700 to-green-400 rounded-lg flex items-center justify-end text-white font-bold text-xs pr-5`}
        >
          <div
            className={`${
              progressPercentage < 20 ? "relative left-12 text-black" : ""
            }`}
          >{`${progressPercentage}%`}</div>
        </div>
      </div>
    </div>
  );
}
