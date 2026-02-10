import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const steps = ['Basic Info', 'Details', 'Tickets'];

export default function EventCreate() {
  const [step, setStep] = useState(0);
  const { tenantId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', date: '', location: '', description: '', ticketPrice: '', maxAttendees: '',
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    // In real app, this would save to backend
    navigate(`/admin/${tenantId}/events`);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/${tenantId}/events`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Create Event</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm ${i <= step ? 'font-medium' : 'text-muted-foreground'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input placeholder="Enter event title" value={form.title} onChange={e => update('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={e => update('date', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Event location" value={form.location} onChange={e => update('location', e.target.value)} />
              </div>
            </>
          )}
          {step === 1 && (
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Describe your event..." rows={6} value={form.description} onChange={e => update('description', e.target.value)} />
            </div>
          )}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label>Ticket Price ($)</Label>
                <Input type="number" placeholder="0" value={form.ticketPrice} onChange={e => update('ticketPrice', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Max Attendees</Label>
                <Input type="number" placeholder="100" value={form.maxAttendees} onChange={e => update('maxAttendees', e.target.value)} />
              </div>
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(s => s + 1)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Check className="h-4 w-4 mr-1" /> Create Event
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
