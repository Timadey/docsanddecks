<x-filament-widgets::widget>
    <div
        x-data="{
            showNotification(message, type = 'success') {
                const notification = document.createElement('div');
                notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg text-white text-sm font-medium transition-all duration-300 ${
                    type === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`;
                notification.textContent = message;
                notification.style.backgroundColor = type === 'success' ? '#16a34a' : '#dc2626'; // fallback for bg color
                notification.style.transform = 'translateY(100%)';
                notification.style.opacity = '0';

                document.body.appendChild(notification);
                void notification.offsetWidth;
                notification.style.transform = 'translateY(0)';
                notification.style.opacity = '1';

                setTimeout(() => {
                    notification.style.transform = 'translateY(100%)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }
        }"
        x-on:notify.window="showNotification($event.detail.message, $event.detail.type)"
    >
        <x-filament::section>
            <x-slot name="heading">Your Referral Information</x-slot>

            <x-slot name="description">
                Share your referral code or registration link to earn rewards when people join using your referral.
            </x-slot>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Referral Code -->
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Referral Code</label>
                    <div class="flex items-center space-x-2">
                        <input
                            type="text"
                            value="{{ $this->getReferralCode() }}"
                            readonly
                            class="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-mono dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                            id="referral-code"
                        >
                        <button
                            type="button"
                            x-data="{ copying: false }"
                            x-on:click="
                                copying = true;
                                navigator.clipboard.writeText('{{ $this->getReferralCode() }}')
                                    .then(() => {
                                        $dispatch('notify', { message: 'Referral code copied!', type: 'success' });
                                        copying = false;
                                    })
                                    .catch(() => {
                                        const input = document.getElementById('referral-code');
                                        input.select();
                                        document.execCommand('copy');
                                        $dispatch('notify', { message: 'Referral code copied!', type: 'success' });
                                        copying = false;
                                    });
                            "
                            class="px-3 py-2 bg-green-600 text-gray-800 dark:text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                            :class="{ 'opacity-75': copying }"
                        >
                            <!-- Icon -->
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Share this code with friends during registration
                    </p>
                </div>

                <!-- Registration URL -->
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-200">Registration Link</label>
                    <div class="flex items-center space-x-2">
                        <input
                            type="text"
                            value="{{ $this->getRegistrationUrl() }}"
                            readonly
                            class="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm font-mono dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                            id="registration-url"
                        >
                        <button
                            type="button"
                            x-data="{ copying: false }"
                            x-on:click="
                                copying = true;
                                navigator.clipboard.writeText('{{ $this->getRegistrationUrl() }}')
                                    .then(() => {
                                        $dispatch('notify', { message: 'Registration link copied!', type: 'success' });
                                        copying = false;
                                    })
                                    .catch(() => {
                                        const input = document.getElementById('registration-url');
                                        input.select();
                                        document.execCommand('copy');
                                        $dispatch('notify', { message: 'Registration link copied!', type: 'success' });
                                        copying = false;
                                    });
                            "
                            class="px-3 py-2 bg-blue-600 text-gray-800 dark:text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                            :class="{ 'opacity-75': copying }"
                        >
                            <!-- Icon -->
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Direct link with your referral code embedded
                    </p>
                </div>
            </div>

            <!-- Instructions -->
            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    How to earn referral rewards:
                </h4>
                <ul class="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Share your referral code or registration link with friends</li>
                    <li>• They must use your code during registration</li>
                    <li>• You earn rewards when they complete payment</li>
                    <li>• Track your referrals in the "My Referrals" section</li>
                </ul>
            </div>
        </x-filament::section>
    </div>
</x-filament-widgets::widget>
