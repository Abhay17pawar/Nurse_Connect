import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"
import { Bell, Calendar, Home, Settings, User, AlertTriangle, Activity, Heart, Weight, Ruler } from "lucide-react";

const HealthStatCard = ({ icon: Icon, title, value, unit, trend }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    aria-labelledby={title}
  >
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-full bg-blue-100 shadow-inner">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <span className={`text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {trend === "up" ? "↑" : "↓"} {Math.floor(Math.random() * 10) + 1}%
        </span>
      </div>
      <h3 className="text-gray-700 text-sm font-semibold" id={title}>{title}</h3>
      <p className="text-3xl font-bold text-gray-900">
        {value} <span className="text-sm text-gray-500">{unit}</span>
      </p>
    </div>
  </motion.div>
);

const AppointmentCard = ({ date, time, doctor, department }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }} 
    transition={{ duration: 0.3 }}
    className="bg-white p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-300"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-800">{doctor}</p>
        <p className="text-sm text-gray-500">{department}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-600">{date}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  </motion.div>
);


export default function HomePage() {
  const [isEmergency, setIsEmergency] = React.useState(false);
  const navigate = useNavigate();
  const patientName = "John Doe";
  const appointments = [
    { id: 1, date: "Oct 25", time: "09:00 AM", doctor: "Dr. Smith", department: "Cardiology" },
    { id: 2, date: "Oct 28", time: "02:30 PM", doctor: "Dr. Johnson", department: "Orthopedics" },
    { id: 3, date: "Nov 05", time: "11:15 AM", doctor: "Dr. Williams", department: "Neurology" },
  ];

  const handleEmergency = () => {
    navigate('/map')
    setIsEmergency(true);
    setTimeout(() => setIsEmergency(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col gap-8 rounded-lg">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">{patientName}</h2>
          <p className="text-sm text-gray-600 ml-12">Patient ID: 12345</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {[ { icon: Calendar, label: "Appointments" }, { icon: User, label: "Profile" }, { icon: Bell, label: "Notifications" }, { icon: Settings, label: "Settings" }].map(({ icon: Icon, label }) => (
            <button 
              key={label}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              aria-label={label}
            >
              <Icon className="w-5 h-5" /> {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {patientName}</h1>
          <AnimatePresence>
            {isEmergency ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg animate-pulse shadow-md"
              >
                Emergency services notified
              </motion.div>
            ) : (
              <button 
                onClick={handleEmergency}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                aria-label="Notify emergency services"
              >
                <AlertTriangle className="w-5 h-5" /> Emergency
              </button>
            )}
          </AnimatePresence>
        </header>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HealthStatCard icon={Activity} title="Blood Pressure" value="120/80" unit="mmHg" trend="up" />
            <HealthStatCard icon={Heart} title="Heart Rate" value="72" unit="bpm" trend="down" />
            <HealthStatCard icon={Weight} title="Weight" value="70" unit="kg" trend="down" />
            <HealthStatCard icon={Ruler} title="BMI" value="22.5" unit="" trend="up" />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
