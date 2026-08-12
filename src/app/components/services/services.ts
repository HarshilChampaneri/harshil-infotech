import { Component } from '@angular/core';

interface Service {
  number: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent {
  services: Service[] = [
    { number: '01', icon: '⌘', title: 'New computers & laptops', description: 'We provide the right device for work, learning, play and everything in between.' },
    { number: '02', icon: '⌁', title: 'Computer Hardware service', description: 'We provide reliable upgrades, maintenance and all-in computer hardware support.' },
    { number: '03', icon: '▦', title: 'Computer Accessories & extras', description: 'We sell essential accessories from trusted brands to complete your setup.' },
    { number: '04', icon: '⌬', title: 'Chip-level repairing', description: 'We resolve your deep technical problems that bring your valuable devices back to life.' },
    { number: '05', icon: '▤', title: 'Printer repair & refill', description: 'We serve printer servicing plus cartridge and toner refilling that saves you money.' },
    { number: '06', icon: '◫', title: 'Computer classes', description: 'We run short, practical courses to help you feel confident with technology.' },
    { number: '07', icon: '◉', title: 'CCTV camera services', description: 'We provide thoughtful security solutions for your home, shop or workplace.' },
    { number: '08', icon: '✦', title: 'Graphics Design & digital work', description: 'We design banners, posters, brochures, photo editing and more.' },
  ];
}
