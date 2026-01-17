import React from "react";
import { Clock } from "lucide-react";

const Title = React.memo(({ text }) => {
  return (
    <div>
      <h2 className="text-xl min-[450px]:text-3xl  font-extrabold text-gray-100 mb-7 border-l-4 border-yellow-400 pl-4 flex items-center gap-x-3">
        <Clock className="text-blue-500" />
        {text}
      </h2>
    </div>
  );
});

export default Title;
