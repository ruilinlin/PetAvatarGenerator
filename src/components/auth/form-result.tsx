interface FormResultProps {
  message?: string;
  type: "error" | "success";
}

export const FormResult = ({ message, type }: FormResultProps) => {
  if (!message) return null;
  
  const styles = {
    error: "bg-destructive/15 text-destructive",
    success: "bg-emerald-500/15 text-emerald-500"
  };
  
  return (
    <div className={`p-3 rounded-md text-sm ${styles[type]}`}>
      {message}
    </div>
  );
};