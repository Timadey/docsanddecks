<x-filament::page>
    <div class="max-w-xl mx-auto">
        {{ $this->form }}

        <x-filament::button
            type="submit"
            form="form"
            wire:click="submit"
            class="mt-4"
        >
            Save Changes
        </x-filament::button>
    </div>
</x-filament::page>
