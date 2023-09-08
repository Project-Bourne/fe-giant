import { Button } from "@/components/ui";
import { useState } from "react";

function DigestModal() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Timeframe</label>
        <select className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light">
          <option value="24">Past 24 hours</option>
          <option value="">Past 48 hours</option>
          <option value="">Past 72 hours</option>
        </select>
      </div>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Sector</label>
        <select className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light">
          <option value="">Agriculture</option>
          <option value="">Economics</option>
          <option value="">Medicine</option>
        </select>
      </div>
      <Button
        value={"Generate"}
        size="xl"
        type="submit"
        background="bg-sirp-primary"
        classNameStyle="py-3 text-white text-[14px] mt-7"
        loading={loading}
      />
    </form>
  );
}

export default DigestModal;
