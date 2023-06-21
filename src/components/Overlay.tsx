interface OverlayProps {
  title: string
  children: React.ReactNode
}

export const Overlay = ({ title, children }: OverlayProps) => {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4 text-black shadow-lg shadow-black">
        <h2 className="text-center text-6xl">{title}</h2>
        {children}
      </div>
    </div>
  )
}
