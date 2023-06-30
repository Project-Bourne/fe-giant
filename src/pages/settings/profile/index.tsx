import SettingsLayout from '@/layout/SettingsLayout';
import { useRouter } from 'next/router';
import React from 'react'

const ProfileSettings = () => {

  const router = useRouter();

  return (
    <SettingsLayout>
      <div className='py-8 px-8'>
        Profilesettings

      </div>
    </SettingsLayout>
  )
}

export default ProfileSettings;