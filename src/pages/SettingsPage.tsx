import { motion } from 'framer-motion';
import { Settings, Moon, Bell, Shield, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function SettingsPage() {
  const settings = [
    { icon: Moon, label: 'Appearance', description: 'Dark mode and theme settings' },
    { icon: Bell, label: 'Notifications', description: 'Manage notification preferences' },
    { icon: Shield, label: 'Privacy', description: 'Control your privacy settings' },
    { icon: Key, label: 'Security', description: 'Password and security options' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center space-x-3">
          <Settings className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>

        <div className="divide-y divide-gray-100">
          {settings.map(({ icon: Icon, label, description }) => (
            <motion.div
              key={label}
              whileHover={{ x: 5 }}
              className="py-4"
            >
              <Button
                variant="ghost"
                className="w-full flex items-start text-left"
              >
                <Icon className="h-5 w-5 text-gray-500 mt-1" />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}