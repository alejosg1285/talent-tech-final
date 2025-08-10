import type { IRegister } from "../interfaces/register"

interface Props {
    registers: IRegister[];
}

const TableRegisters = ({ registers }: Props) => {
  const convertSecondsToTime = (totalSecond: number): string => {
    const hours = Math.floor(totalSecond / 3600);
    const minutes = Math.floor((totalSecond - (hours * 3600)) / 60);
    const seconds = totalSecond - (hours * 3600) - (minutes * 60);
    
    console.info(`h: ${hours} - m: ${minutes} - s: ${seconds}`);
    return `${hours}:${minutes}:${seconds} s`;
  }
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Inicio</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Final</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">T. Definido</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">T. Dedicado</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {registers && (
          <>
            {registers.map((register: IRegister) => (
              <tr key={register._id}>
                <td className="px-6 py-2 whitespace-nowrap">{ register.initial_time.split('T')[0] }</td>
                <td className="px-6 py-2 whitespace-nowrap">{ register.final_time.split('T')[0] }</td>
                <td className="px-6 py-2 whitespace-nowrap">{ convertSecondsToTime(register.activity_time) }</td>
                <td className="px-6 py-2 whitespace-nowrap">{ convertSecondsToTime(register.total_time) }</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  )
}

export default TableRegisters