import React, { useState } from 'react';

const NotificationSettings = () => {
  // State for all notification options – matches the original HTML
  const [settings, setSettings] = useState({
    // Enquiries
    enquiries_email: true,      // mandatory, disabled
    enquiries_app: false,
    // Replies to your responses
    replies_email: false,
    replies_app: false,
    // Follow-up Reminders
    reminders_email: false,
    reminders_app: false,
    // Missed PNS Calls
    missedCalls_email: false,
    missedCalls_sms: false,
    missedCalls_app: false,
    // Answered PNS Calls
    answeredCalls_email: false,
    answeredCalls_app: false,
    // BuyLead Alerts
    buyleads_email: true,
    buyleads_app: false,
    // BuyLead Night Notifications
    buyleads_night_app: false,
    // BuyLead Post Purchase
    buyleads_purchase_email: false,
    buyleads_purchase_app: false,
    // IMA: Allocation and Lapse
    ima_alloc_lapse_email: false,
    // Tender Alerts
    tender_alerts_email: false,
    tender_alerts_app: false,
    // Tender Post Purchase
    tender_purchase_email: false,
    // IndiaMART's new offerings
    indiamart_updates_email: true,   // mandatory, disabled
    indiamart_updates_sms: false,
    // Third Party Promotional Offers
    thirdParty_email: false,
    thirdParty_sms: false,
    // Business Surveys
    surveys_email: false,
    // IndiaMART Service Messages
    serviceMessages_email: true,      // mandatory, disabled
    serviceMessages_sms: true,
    // Buying Alerts
    buyingAlerts_email: false,
    // WhatsApp Communication
    whatsapp_communication: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    // Build a summary of enabled settings (skip mandatory ones as they are always on)
    const enabled = Object.entries(settings)
      .filter(([key, value]) => value && !key.includes('mandatory')) // but we don't have a mandatory flag, we'll just show all enabled
      .map(([key]) => key.replace(/_/g, ' '))
      .join(', ');

    const message = enabled
      ? `✅ Settings saved!\nEnabled:\n${enabled.split(', ').join('\n')}`
      : 'No optional notifications selected.';

    // Show a prompt (or alert) – replace with your own modal/toast if desired
    window.alert(message);
    // In a real app you would also send the settings to an API:
    // fetch('/api/save-notifications', { method: 'POST', body: JSON.stringify(settings) });
  };

  // Helper to render a row with all channel options
  const renderRow = (
    label,
    emailKey = null,
    smsKey = null,
    appKey = null,
    whatsappKey = null,
    isMandatoryEmail = false,
    isMandatorySMS = false
  ) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-2 transition-colors">
      <div className="w-[45%] text-[#333] font-medium text-sm">
        {label}
        <p className="text-xs text-gray-500 font-normal mt-0.5">{/* description can be added */}</p>
      </div>
      <div className="w-[15%] flex justify-center">
        {emailKey ? (
          isMandatoryEmail ? (
            <span className="flex items-center gap-2">
              <input type="checkbox" disabled checked={settings[emailKey]} className="accent-[#2c3691] cursor-not-allowed opacity-60 w-4 h-4" />
              <label className="text-[10px] text-gray-500 italic hidden sm:block">Mandatory</label>
            </span>
          ) : (
            <input
              type="checkbox"
              className="accent-[#2c3691] w-4 h-4 cursor-pointer"
              name={emailKey}
              checked={settings[emailKey] || false}
              onChange={handleChange}
            />
          )
        ) : (
          <span className="w-4 h-4 border-t border-gray-400 mt-2 block opacity-50"></span>
        )}
      </div>
      <div className="w-[15%] flex justify-center">
        {smsKey ? (
          isMandatorySMS ? (
            <span className="flex items-center gap-2">
              <input type="checkbox" disabled checked={settings[smsKey]} className="accent-[#2c3691] cursor-not-allowed opacity-60 w-4 h-4" />
              <label className="text-[10px] text-gray-500 italic hidden sm:block">Mandatory</label>
            </span>
          ) : (
            <input
              type="checkbox"
              className="accent-[#2c3691] w-4 h-4 cursor-pointer"
              name={smsKey}
              checked={settings[smsKey] || false}
              onChange={handleChange}
            />
          )
        ) : (
          <span className="w-4 h-4 border-t border-gray-400 mt-2 block opacity-50"></span>
        )}
      </div>
      <div className="w-[10%] flex justify-center">
        {appKey ? (
          <input
            type="checkbox"
            className="accent-[#2c3691] w-4 h-4 cursor-pointer"
            name={appKey}
            checked={settings[appKey] || false}
            onChange={handleChange}
          />
        ) : (
          <span className="w-4 h-4 border-t border-gray-400 mt-2 block opacity-50"></span>
        )}
      </div>
      <div className="w-[15%] flex justify-center">
        {whatsappKey ? (
          <input
            type="checkbox"
            className="accent-[#2c3691] w-4 h-4 cursor-pointer"
            name={whatsappKey}
            checked={settings[whatsappKey] || false}
            onChange={handleChange}
          />
        ) : (
          <span className="w-4 h-4 border-t border-gray-400 mt-2 block opacity-50"></span>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[4px] border border-[#dde0e4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] w-full overflow-hidden">
      <div className="w-full">
        {/* Header Row */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f9fc] border-b border-[#dde0e4]">
          <div className="w-[45%]">
            <div className="font-bold text-[#333] text-[15px]">
              <span>Notification Settings</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span>Manage Your Settings for Important Alerts</span>
            </div>
          </div>
          <div className="w-[15%] text-center">
            <div className="font-bold text-xs text-[#555] mb-1"><span>Email</span></div>
            <div className="text-[10px] text-gray-400 truncate w-full" title="dushyantsaket20@gmail.com">
              <span>dushyantsaket20@gmail.com</span>
            </div>
          </div>
          <div className="w-[15%] text-center">
            <div className="font-bold text-xs text-[#555] mb-1"><span>SMS</span></div>
            <div className="text-[10px] text-gray-400">
              <span>9244526432</span>
            </div>
          </div>
          <div className="w-[10%] text-center">
            <div className="font-bold text-xs text-[#555] mb-1"><span>APP</span></div>
            <div className=""><span></span></div>
          </div>
          <div className="w-[15%] text-center">
            <div className="font-bold text-xs text-[#555] mb-1"><span>WhatsApp</span></div>
            <div className=""><span></span></div>
          </div>
        </div>

        <div className="p-6 space-y-8">
            {/* Enquiries section */}
            <div className="wrap">
              <div className="flex bg-[#f5f6f8] px-4 py-2 border-l-4 border-[#2c3691] mb-2 font-bold text-[#333] text-sm">
                <div className="w-full">Enquiries</div>
              </div>
              {renderRow('Business Enquiries', 'enquiries_email', null, 'enquiries_app', null, true)}
              {renderRow('Replies to your responses', 'replies_email', null, 'replies_app', null)}
              {renderRow('Follow-up Reminders', 'reminders_email', null, 'reminders_app', null)}
              {renderRow('Missed PNS* Calls', 'missedCalls_email', 'missedCalls_sms', 'missedCalls_app', null)}
              {renderRow('Answered PNS* Calls', 'answeredCalls_email', null, 'answeredCalls_app', null)}
            </div>

            {/* BuyLeads / Tenders */}
            <div className="wrap border-t border-gray-100 pt-6">
              <div className="flex bg-[#f5f6f8] px-4 py-2 border-l-4 border-[#2c3691] mb-2 font-bold text-[#333] text-sm">
                <div className="w-full">BuyLeads / Tenders</div>
              </div>
              {renderRow('BuyLead Alerts', 'buyleads_email', null, 'buyleads_app', null)}
              {renderRow('BuyLead Night Notifications', null, null, 'buyleads_night_app', null)}
              {renderRow('BuyLead Post Purchase', 'buyleads_purchase_email', null, 'buyleads_purchase_app', null)}
              {renderRow('IMA: Allocation and Lapse', 'ima_alloc_lapse_email', null, null, null)}
              {renderRow('Tender Alerts', 'tender_alerts_email', null, 'tender_alerts_app', null)}
              {renderRow('Tender Post Purchase', 'tender_purchase_email', null, null, null)}
            </div>

            {/* Promotional Communication */}
            <div className="wrap border-t border-gray-100 pt-6">
              <div className="flex bg-[#f5f6f8] px-4 py-2 border-l-4 border-[#2c3691] mb-2 font-bold text-[#333] text-sm">
                <div className="w-full">Promotional Communication</div>
              </div>
              {renderRow("IndiaMART's new offerings", 'indiamart_updates_email', 'indiamart_updates_sms', null, null, true, false)}
              {renderRow('Third Party Promotional Offers', 'thirdParty_email', 'thirdParty_sms', null, null)}
              {renderRow('Business Surveys', 'surveys_email', null, null, null)}
            </div>

            {/* Service Messages */}
            <div className="wrap border-t border-gray-100 pt-6">
              <div className="flex bg-[#f5f6f8] px-4 py-2 border-l-4 border-[#2c3691] mb-2 font-bold text-[#333] text-sm">
                <div className="w-full">Service Messages</div>
              </div>
              {renderRow('IndiaMART Service Messages', 'serviceMessages_email', 'serviceMessages_sms', null, null, true, true)}
            </div>

            {/* Your Buying Activities */}
            <div className="wrap border-t border-gray-100 pt-6">
              <div className="flex bg-[#f5f6f8] px-4 py-2 border-l-4 border-[#2c3691] mb-2 font-bold text-[#333] text-sm">
                <div className="w-full">Your Buying Activities</div>
              </div>
              {renderRow('Buying Alerts', 'buyingAlerts_email', null, null, null)}
              {renderRow('WhatsApp Communication', null, null, null, 'whatsapp_communication')}
            </div>

            {/* Save Button */}
            <div className="mt-8 text-center pt-6 border-t border-gray-200">
              <button className="bg-[#1a4ab9] text-white hover:bg-[#2c3691] px-10 py-3 rounded text-sm font-bold shadow-md hover:shadow-lg transition-all" onClick={handleSave}>
                Save Settings
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
