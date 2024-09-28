export default function stylesManager() {
    return {
        message: 'Hello from stylesManager',
        showClientModal: false,
        showAddStyleModal: false,
        showAddSampleModal: false,
        showDropdown: false,
        clients: [],
        styles: [],
        filteredStyles: [],
        samples: [],
        filteredSamples: [],
        selectedClient: null,
        newStyle: { name: null, price: null },
        newSample: { name: '', time: null, price: null },
        styleSearch: '',
        sampleSearch: '',

        init() {
            console.log(this.message);
            this.fetchClients();
            this.loadSelectedClient();
        },

        async fetchClients() {
            try {
                const response = await fetch('/clients');
                this.clients = await response.json();
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        },

        openModal() {
            this.showClientModal = true;
        },

        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },

        selectClient(client) {
            this.selectedClient = client;
            this.showDropdown = false;
            this.showClientModal = false;
            this.saveSelectedClient(client);
            this.fetchStyles(client.id);
            this.fetchSamples(client.id);
        },

        saveSelectedClient(client) {
            localStorage.setItem('selectedClient', JSON.stringify(client));
        },

        loadSelectedClient() {
            const client = JSON.parse(localStorage.getItem('selectedClient'));
            if (client) {
                this.selectedClient = client;
                this.fetchStyles(client.id);
                this.fetchSamples(client.id);
            }
        },

        async fetchStyles(clientId) {
            try {
                const response = await fetch(`/styles/client/${clientId}`);
                this.styles = (await response.json()).map(style => ({ ...style, isEditing: false }));
                this.filteredStyles = this.styles;
            } catch (error) {
                console.error('Error fetching styles:', error);
            }
        },

        async fetchSamples(clientId) {
            try {
                const response = await fetch(`/samples/client/${clientId}`);
                this.samples = (await response.json()).map(sample => ({ ...sample, isEditing: false }));
                this.filteredSamples = this.samples;
            } catch (error) {
                console.error('Error fetching samples:', error);
            }
        },

        async addStyle() {
            const style = { ...this.newStyle, client_id: this.selectedClient.id };
            try {
                const response = await fetch('/styles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(style)
                });
                const newStyle = await response.json();
                this.styles.push({ ...newStyle, isEditing: false });
                this.filteredStyles = this.styles;
                this.showAddStyleModal = false;
                this.newStyle = { name: '', price: null }; // Clear the form
            } catch (error) {
                console.error('Error adding style:', error);
            }
        },

        async addSample() {
            const sample = { ...this.newSample, client_id: this.selectedClient.id };
            try {
                const response = await fetch('/samples', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sample)
                });
                const newSample = await response.json();
                this.samples.push({ ...newSample, isEditing: false });
                this.filteredSamples = this.samples;
                this.showAddSampleModal = false;
                this.newSample = { name: '', time: null, price: null }; // Clear the form
            } catch (error) {
                console.error('Error adding sample:', error);
            }
        },

        editStyle(style) {
            style.original = { ...style }; // Store original data
            style.isEditing = true;
        },

        editSample(sample) {
            sample.original = { ...sample }; // Store original data
            sample.isEditing = true;
        },

        cancelEditStyle(style) {
            Object.assign(style, style.original); // Revert to original data
            style.isEditing = false;
            callSuccess('Style Edit canceled.', 'No changes were saved.')
        },

        cancelEditSample(sample) {
            Object.assign(sample, sample.original); // Revert to original data
            sample.isEditing = false;
            callSuccess('Sample Edit canceled.', 'No changes were saved.')
        },

        async saveStyle(style) {
            try {
                const updatedStyle = {
                    id: style.id,
                    name: style.name,
                    price: style.price,
                    client_id: style.client_id
                };
                const response = await fetch(`/styles/${style.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedStyle)
                });
                if (response.ok) {
                    style.isEditing = false;
                    callSuccess('Style edit successful', 'Changes saved.')
                } else {
                    console.error('Error saving style:', await response.json());
                }
            } catch (error) {
                console.error('Error saving style:', error);
            }
        },

        async saveSample(sample) {
            try {
                const updatedSample = {
                    id: sample.id,
                    name: sample.name,
                    time: sample.time,
                    price: sample.price,
                    client_id: sample.client_id
                };
                const response = await fetch(`/samples/${sample.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedSample)
                });
                if (response.ok) {
                    sample.isEditing = false;
                    callSuccess('Sample edit successful', 'Changes saved.')
                } else {
                    console.error('Error saving sample:', await response.json());
                }
            } catch (error) {
                console.error('Error saving sample:', error);
            }
        },

        async deleteStyle(styleId) {
            try {
                const response = await fetch(`/styles/${styleId}`, { method: 'DELETE' });
                if (response.ok) {
                    this.styles = this.styles.filter(style => style.id !== styleId);
                    this.filteredStyles = this.styles;
                } else {
                    console.error('Error deleting style:', await response.json());
                }
            } catch (error) {
                console.error('Error deleting style:', error);
            }
        },

        async deleteSample(sampleId) {
            try {
                const response = await fetch(`/samples/${sampleId}`, { method: 'DELETE' });
                if (response.ok) {
                    this.samples = this.samples.filter(sample => sample.id !== sampleId);
                    this.filteredSamples = this.samples;
                } else {
                    console.error('Error deleting sample:', await response.json());
                }
            } catch (error) {
                console.error('Error deleting sample:', error);
            }
        },

        closeModal() {
            this.showClientModal = false;
        },

        searchStyles() {
            this.filteredStyles = this.styles.filter(style => 
                style.name.toLowerCase().includes(this.styleSearch.toLowerCase())
            );
        },

        searchSamples() {
            this.filteredSamples = this.samples.filter(sample => 
                sample.name.toLowerCase().includes(this.sampleSearch.toLowerCase())
            );
        }
    };
}