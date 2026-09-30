/** Content extracted from the approved Codeware homepage design. Used as block defaults and for the seeded home page. */
export const defaults = {
  CwHeader: {
    logo: '/codeware/5894dba3.svg',
    productsEyebrow: 'Codeware software',
    productsNote: 'Five products. Everyday business challenges.',
    products: [
      {
        name: 'CW ERP',
        desc: 'Business operations.',
        icon: 'design',
      },
      {
        name: 'iDesk360',
        desc: 'Customer communication.',
        icon: 'connect',
      },
      {
        name: 'CW Ticketing',
        desc: 'Transport and reservations.',
        icon: 'web',
      },
      {
        name: 'E-commerce Solution',
        desc: 'Online selling experiences.',
        icon: 'code',
      },
      {
        name: 'HR & Payroll Management',
        desc: 'People, attendance and pay.',
        icon: 'design',
      },
    ],
    servicesEyebrow: 'What we build',
    servicesNote: 'From a specific task to a connected platform.',
    servicesLinkLabel: 'Explore all services',
    servicesLinkHref: '/services',
    services: [
      {
        title: 'Custom Software & SaaS',
        desc: 'Software around your workflows.',
        href: '/services/custom-software',
        icon: 'code',
      },
      {
        title: 'Websites & Web Applications',
        desc: 'Useful experiences on the web.',
        href: '/services/web-development',
        icon: 'web',
      },
      {
        title: 'Mobile Applications',
        desc: 'Android and iOS experiences.',
        href: '/services/mobile-apps',
        icon: 'phone',
      },
      {
        title: 'UI/UX & Design',
        desc: 'Clear interfaces and brand experiences.',
        href: '/services/ui-ux-design',
        icon: 'design',
      },
      {
        title: 'Integrations & Automation',
        desc: 'Connect tools and daily processes.',
        href: '/services/integrations',
        icon: 'connect',
      },
      {
        title: 'Digital Marketing',
        desc: 'Visibility, content, and campaigns.',
        href: '/services/digital-marketing',
        icon: 'marketing',
      },
    ],
    links: [
      {
        label: 'Our work',
        href: '#work',
      },
      {
        label: 'Our approach',
        href: '#process',
      },
    ],
    ctaLabel: 'Book a Call',
    mobileCtaLabel: 'Discuss your project',
  },
  CwHero: {
    expStrong: '10+ years',
    expText: 'of experience',
    reachText: 'Working across',
    reachStrong: '24+ countries',
    titleLine1: 'Software that moves',
    titleLine2: 'your business forward.',
    copy: 'Ready-to-use products. Thoughtfully built digital experiences.\nWe connect your people, processes and customers through software, websites and mobile apps.',
    primaryLabel: 'Book an intro call',
    secondaryLabel: 'View services',
    secondaryHref: '/services',
    ratingLogos: [
      {
        src: '/codeware/0b6155c0.svg',
        alt: 'Rangs Electronics',
      },
      {
        src: '/codeware/0236c962.svg',
        alt: 'Pathao',
      },
      {
        src: '/codeware/a719a455.svg',
        alt: 'Modhumoti Bank',
      },
      {
        src: '/codeware/e30ac5da.svg',
        alt: 'Khola Bazaar',
      },
    ],
    ratingCount: '200+',
    ratingStars: '★★★★★',
    ratingValue: '4.9',
    projectsLabel: 'A FEW EXPERIENCES WE’VE HELPED BUILD',
    projects: [
      {
        title: 'Kormi24',
        image: '/codeware/6304e9de.avif',
        href: 'https://www.codewareltd.com/portfolio/',
        meta: 'Web design · development',
        resultValue: '+35%',
        resultLabel: 'More enquiries',
      },
      {
        title: 'Chuze Day',
        image: '/codeware/57d057b9.avif',
        href: 'https://www.codewareltd.com/portfolio/',
        meta: 'Digital product · booking',
        resultValue: '+30%',
        resultLabel: 'More bookings',
      },
      {
        title: 'Airport Hopper',
        image: '/codeware/7f57de88.avif',
        href: 'https://www.codewareltd.com/portfolio/',
        meta: 'Mobile app · experience',
        resultValue: '+25%',
        resultLabel: 'Faster task completion',
      },
      {
        title: 'Rangs Electronics',
        image: '/codeware/1d58eb27.avif',
        href: 'https://www.codewareltd.com/portfolio/',
        meta: 'eCommerce · development',
        resultValue: '+20%',
        resultLabel: 'More completed orders',
      },
    ],
  },
  CwProducts: {
    kicker: 'Our products',
    heading: 'Your daily challenges.\nAlready thought through.',
    intro:
      'Start with software built for the work you do every day. Explore our products, find your fit, and talk to us about making it work for your team.',
    rotationHelp:
      'Products advance every four seconds. The orange line shows the time remaining. Focus a product to pause, or use Pause animations in the footer.',
    items: [
      {
        name: 'CW ERP',
        short: 'Business operations',
        use: 'For disconnected operations',
        title: 'One system. A clearer picture.',
        body: 'Bring finance, stock and everyday operations out of separate spreadsheets and into connected workflows.',
        tags: [
          {
            tag: 'Finance & accounting',
          },
          {
            tag: 'Inventory',
          },
          {
            tag: 'HR & payroll',
          },
        ],
        href: 'https://www.codewareltd.com/productlink/erp-software/',
        exploreLabel: 'Explore CW ERP',
        visualTitle: 'CW ERP',
        visual: 'erp',
        image: '',
        caption: 'Product concept illustration',
      },
      {
        name: 'iDesk360',
        short: 'Customer communication',
        use: 'For scattered customer conversations',
        title: 'Keep every conversation connected.',
        body: 'Give your team one place to organize customer queries, assign ownership and keep track of the next response.',
        tags: [
          {
            tag: 'Query assignment',
          },
          {
            tag: 'Customer conversations',
          },
          {
            tag: 'Agent reporting',
          },
        ],
        href: 'https://www.codewareltd.com/productlink/query-management-system/',
        exploreLabel: 'Explore iDesk360',
        visualTitle: 'iDesk360',
        visual: 'image',
        image: '/codeware/01f5189f.webp',
        caption: 'Portfolio illustration',
      },
      {
        name: 'CW Ticketing',
        short: 'Transport & reservations',
        use: 'For complex transport bookings',
        title: 'Take the friction out of ticketing.',
        body: 'Connect seat availability, bookings and ticket sales so your team can manage each journey with greater clarity.',
        tags: [
          {
            tag: 'Bookings & seats',
          },
          {
            tag: 'Web & mobile',
          },
          {
            tag: 'Operational reporting',
          },
        ],
        href: 'https://www.codewareltd.com/productlink/bus-ticket-booking-system/',
        exploreLabel: 'Explore CW Ticketing',
        visualTitle: 'CW Ticketing',
        visual: 'image',
        image: '/codeware/07960692.webp',
        caption: 'Portfolio illustration',
      },
      {
        name: 'E-commerce Solution',
        short: 'Online commerce',
        use: 'For growing online sales',
        title: 'A store that works beyond checkout.',
        body: 'Bring browsing, payments and order handling into one connected online selling experience.',
        tags: [
          {
            tag: 'Product catalogue',
          },
          {
            tag: 'Checkout',
          },
          {
            tag: 'Order handling',
          },
        ],
        href: 'https://www.codewareltd.com/productlink/ecommerce-solution/',
        exploreLabel: 'Explore E-commerce Solution',
        visualTitle: 'E-commerce Solution',
        visual: 'commerce',
        image: '',
        caption: 'Product concept illustration',
      },
      {
        name: 'HR & Payroll Management',
        short: 'People, attendance & pay',
        use: 'For time-consuming people admin',
        title: 'Less payroll admin. More clarity.',
        body: 'Keep employee records, attendance, leave and payroll connected, with salary calculations and payslips in one workflow.',
        tags: [
          {
            tag: 'Employee records',
          },
          {
            tag: 'Attendance & leave',
          },
          {
            tag: 'Payroll & payslips',
          },
        ],
        href: 'https://www.codewareltd.com/productlink/hr-payroll-management/',
        exploreLabel: 'Explore HR & Payroll',
        visualTitle: 'People. Time. Payroll.',
        visual: 'hr',
        image: '',
        caption: 'Product concept illustration',
      },
    ],
    askLabel: 'Ask about this product',
    footerLabel: 'Explore our products',
  },
  CwClientBand: {
    title: 'Trusted By 200+ Global Brands',
    row1: [
      {
        src: '/codeware/0b6155c0.svg',
        alt: 'Rangs Electronics',
      },
      {
        src: '/codeware/0236c962.svg',
        alt: 'Pathao',
      },
      {
        src: '/codeware/a719a455.svg',
        alt: 'Modhumoti Bank',
      },
      {
        src: '/codeware/e30ac5da.svg',
        alt: 'Khola Bazaar',
      },
      {
        src: '/codeware/f12ef4ac.svg',
        alt: 'Khaas Food',
      },
      {
        src: '/codeware/c18c293b.svg',
        alt: 'Hatil',
      },
      {
        src: '/codeware/7ef8ccd8.svg',
        alt: 'Haier',
      },
    ],
    row2: [
      {
        src: '/codeware/c097dd60.svg',
        alt: 'Gorilla Move',
      },
      {
        src: '/codeware/50d89454.svg',
        alt: 'Digicon',
      },
      {
        src: '/codeware/b5e23bb4.svg',
        alt: 'DESCO',
      },
      {
        src: '/codeware/377c731c.svg',
        alt: 'Akash',
      },
      {
        src: '/codeware/9d342b79.svg',
        alt: 'Airtel',
      },
      {
        src: '/codeware/b3cd2dac.svg',
        alt: 'Sheba Platform',
      },
      {
        src: '/codeware/fc58e5a2.svg',
        alt: 'Robi',
      },
    ],
  },
  CwShowcase: {
    srTitle: 'Systems and experiences we build',
    video: '/codeware/f3fb5d7c.mp4',
    poster: '/codeware/ed6653af.jpg',
    reel1: {
      label: 'Codeware / Software & systems',
      title: 'Less repetition.',
      em: 'More progress.',
      steps: [
        {
          step: 'New enquiry',
        },
        {
          step: 'Team review',
        },
        {
          step: 'Next step',
        },
      ],
      foot: 'Illustrative workflow · not a product interface',
    },
    reel2: {
      label: 'Codeware / Customer communication',
      title: 'Every conversation.\nA clearer context.',
      image: '/codeware/01f5189f.webp',
      foot: 'iDesk360 · imagery from supplied portfolio',
    },
    reel3: {
      label: 'Codeware / Transport & reservations',
      title: 'From a booking.\nTo a journey.',
      image: '/codeware/07960692.webp',
      foot: 'CW Ticketing · imagery from supplied portfolio',
    },
    kicker: 'Our services',
    titleBefore: 'Built for',
    titleAccent: 'your next.',
    titleLine2: 'Designed around you.',
    intro:
      'Bring your requirements, your existing platform, or a process that needs to work better. We’ll help you find a practical way forward.',
    ctaLabel: 'Explore our services',
    ctaHref: '/services',
  },
  CwServices: {
    items: [
      {
        slug: 'custom-software',
        title: 'Custom Software & SaaS',
        description:
          'Custom business software, SaaS platforms, internal dashboards and tools built around the way your team works. Turn complex requirements into connected, practical systems.',
        href: '/services/custom-software',
        image1: '/codeware/88efd08f.avif',
        alt1: 'Blue laptop website mockup; supplied illustrative image',
        image2: '/codeware/4968066d.avif',
        alt2: 'Green mobile payment interface mockup; supplied illustrative image',
      },
      {
        slug: 'web-development',
        title: 'Web Development',
        description:
          'Business websites, customer portals, e-commerce experiences and web applications. Connect clear design with reliable functionality for your customers and internal teams.',
        href: '/services/web-development',
        image1: '/codeware/6de3bb3e.avif',
        alt1: 'Orange dashboard tablet mockup; supplied illustrative image',
        image2: '/codeware/7ca4e18f.avif',
        alt2: 'Yellow restaurant website tablet mockup; supplied illustrative image',
      },
      {
        slug: 'mobile-apps',
        title: 'Mobile Applications',
        description:
          'Android and iOS applications designed around real user journeys. Bring useful features, straightforward navigation and connected services to the devices your customers use.',
        href: '/services/mobile-apps',
        image1: '/codeware/1d3f597f.avif',
        alt1: 'Green brand identity concept; supplied illustrative image',
        image2: '/codeware/3f392960.avif',
        alt2: 'Mobile app icon presentation; supplied illustrative image',
      },
      {
        slug: 'design-services',
        title: 'UI/UX & Design',
        description:
          'User journeys, wireframes, interface design, prototypes and brand experiences. Make your product easier to understand, simpler to navigate and more consistent to use.',
        href: '/services/ui-ux-design',
        image1: '/codeware/60835b5e.avif',
        alt1: 'Desktop website design mockup; supplied illustrative image',
        image2: '/codeware/fdbba4d2.avif',
        alt2: 'Digital agency website mockup; supplied illustrative image',
      },
      {
        slug: 'integrations',
        title: 'Integrations & Automation',
        description:
          'API connections, system integrations and workflow automation. Keep information moving between your tools and reduce the manual work that slows your team down.',
        href: '/services/integrations',
        image1: '/codeware/fb5128ea.avif',
        alt1: 'Tablet interface in use; supplied illustrative image',
        image2: '/codeware/4dc98a5b.avif',
        alt2: 'Purple product branding concept; supplied illustrative image',
      },
      {
        slug: 'marketing-services',
        title: 'Digital Marketing',
        description:
          'SEO, social media, paid campaigns and content creation. Help the right people discover your business and find a clearer path from interest to enquiry.',
        href: '/services/digital-marketing',
        image1: '/codeware/fa5b664c.avif',
        alt1: 'Mobile AI interface concept; supplied illustrative image',
        image2: '/codeware/80668ac3.avif',
        alt2: 'Laptop website on a green background; supplied illustrative image',
      },
    ],
    footText:
      'Have a specific challenge in mind?\nStart with what you need to make work better.',
    ctaLabel: 'Discuss your project',
  },
  CwWork: {
    kicker: 'Selected work',
    heading: 'Different challenges.\nThoughtful solutions.',
    intro:
      'A selection of web, mobile and commerce projects from Codeware’s portfolio.',
    filters: [
      {
        label: 'All work',
        key: 'all',
      },
      {
        label: 'Web platforms',
        key: 'platform',
      },
      {
        label: 'Mobile',
        key: 'mobile',
      },
      {
        label: 'Commerce',
        key: 'commerce',
      },
    ],
    cards: [
      {
        category: 'platform',
        name: 'Kormi24',
        title:
          'Kormi24: connecting people, skills and opportunities through one platform.',
        image: '/codeware/6304e9de.avif',
        alt: 'Supplied illustrative website mockup 1',
        href: 'https://www.codewareltd.com/portfolio/',
        badges: [
          {
            kind: 'react',
            label: 'React',
          },
          {
            kind: 'code',
            label: 'Laravel',
          },
        ],
        impactNumber: '87%',
        impactLabel: 'Increase in leads',
      },
      {
        category: 'mobile',
        name: 'Chuze Day',
        title:
          'Chuze Day: bringing service discovery and booking into one experience.',
        image: '/codeware/57d057b9.avif',
        alt: 'Supplied illustrative website mockup 2',
        href: 'https://www.codewareltd.com/portfolio/',
        badges: [
          {
            kind: 'react',
            label: 'React',
          },
          {
            kind: 'ts',
            label: 'TypeScript',
          },
        ],
        impactNumber: '50%',
        impactLabel: 'Increase in traffic',
      },
      {
        category: 'mobile',
        name: 'Airport Hopper',
        title:
          'Airport Hopper: supporting a connected passenger journey on mobile.',
        image: '/codeware/7f57de88.avif',
        alt: 'Supplied illustrative website mockup 3',
        href: 'https://www.codewareltd.com/portfolio/',
        badges: [
          {
            kind: 'phone',
            label: 'Android & iOS',
          },
        ],
        impactNumber: '30%',
        impactLabel: 'Increase in bookings',
      },
      {
        category: 'commerce',
        name: 'Rangs Electronics',
        title:
          'Rangs Electronics: creating a connected online shopping experience.',
        image: '/codeware/1d58eb27.avif',
        alt: 'Supplied illustrative website mockup 4',
        href: 'https://www.codewareltd.com/portfolio/',
        badges: [
          {
            kind: 'web',
            label: 'E-commerce',
          },
        ],
        impactNumber: '30%',
        impactLabel: 'Increase in sales',
      },
    ],
    footText:
      'From everyday business tools to customer-facing platforms, explore how we turn different requirements into practical digital experiences.',
    footLabel: 'Explore the portfolio',
    footHref: 'https://www.codewareltd.com/portfolio/',
  },
  CwTestimonials: {
    kicker: 'Client perspectives',
    heading: 'Good work starts\nwith good relationships.',
    row1: [
      {
        title: 'A clear direction from the first call.',
        quote:
          'The team helped us turn a long list of ideas into a focused plan. We always knew what was being worked on and what needed our input.',
        name: 'Alex Morgan',
        role: 'Product lead',
        initials: 'AM',
      },
      {
        title: 'Thoughtful about the everyday details.',
        quote:
          'The conversations went beyond the screens. We worked through how our team would actually use the system, and the flow felt much clearer.',
        name: 'Jamie Clarke',
        role: 'Operations manager',
        initials: 'JC',
      },
      {
        title: 'An easier way to work together.',
        quote:
          'Regular reviews gave us room to ask questions and refine the experience. It felt like one team working toward the same goal.',
        name: 'Samira Noor',
        role: 'Business owner',
        initials: 'SN',
      },
      {
        title: 'From an idea to something tangible.',
        quote:
          'Seeing the early flows made the decisions easier. The feedback was practical, the priorities were clear, and we could see the direction taking shape.',
        name: 'Daniel Reed',
        role: 'Startup founder',
        initials: 'DR',
      },
    ],
    row2: [
      {
        title: 'A considered approach to our workflow.',
        quote:
          'The team listened carefully to the small frustrations in our day. The proposed solution brought those scattered tasks into a much simpler journey.',
        name: 'Priya Shah',
        role: 'Project manager',
        initials: 'PS',
      },
      {
        title: 'Clarity at each step.',
        quote:
          'We appreciated having the important choices explained in plain language. Each review helped us understand the progress and plan the next move.',
        name: 'Oliver Hayes',
        role: 'Digital lead',
        initials: 'OH',
      },
      {
        title: 'Built around real conversations.',
        quote:
          'The process gave us space to test assumptions, share feedback and make changes together. That collaboration made a real difference to the experience.',
        name: 'Maya Rahman',
        role: 'Marketing lead',
        initials: 'MR',
      },
      {
        title: 'The handover felt well considered.',
        quote:
          'We talked through the next steps early, so the transition felt organized. Having the details in one place helped our team move forward with confidence.',
        name: 'Chris Parker',
        role: 'Team manager',
        initials: 'CP',
      },
    ],
    footText: '200+ Happy Customers based on complement and customer reviews',
    ctaLabel: 'Let’s discuss your project',
    ctaHref: '#contact',
  },
  CwWhy: {
    kicker: 'Why Codeware',
    heading: 'The right foundation\nfor what comes next.',
    cards: [
      {
        value: '10+ years',
        label: 'Experience across industries',
        text: 'A software company with a portfolio spanning business systems, websites and mobile applications.',
        art: '0',
      },
      {
        value: 'Built around you',
        label: 'Custom software development',
        text: 'Start with the process, the people and the problem. Shape the system around your requirements.',
        art: '1',
      },
      {
        value: 'More ways forward',
        label: 'Products & custom development',
        text: 'Explore an existing Codeware product alongside the option of building something new.',
        art: '2',
      },
      {
        value: 'Connected systems',
        label: 'Integrations & automation',
        text: 'Bring relevant applications together and reduce repeated data handling between them.',
        art: '3',
      },
      {
        value: 'Across platforms',
        label: 'Web, Android & iOS',
        text: 'Plan connected experiences for the places your customers and teams need to work.',
        art: '4',
      },
      {
        value: 'Business context',
        label: 'Operations, communication & commerce',
        text: 'Consider the workflow behind the interface, from an enquiry to an order or a booking.',
        art: '5',
      },
    ],
  },
  CwProcess: {
    kicker: 'Our process',
    heading: 'A clear path.\nA shared direction.',
    text: 'From the first conversation to the next release, keep the important decisions visible and the work focused on your goals.',
    ctaLabel: 'Discuss your requirements',
    ctaHref: '#contact',
    fallback: 'A shared direction.\nA considered process.',
    steps: [
      {
        label: 'Discovery',
        image: '/codeware/3d4939e0.avif',
        alt: 'Kickoff and project discovery',
      },
      {
        label: 'Planning',
        image: '/codeware/373a9db4.avif',
        alt: 'Research and planning insights',
      },
      {
        label: 'UI/UX Design',
        image: '/codeware/34159fa2.avif',
        alt: 'UI and UX design process',
      },
      {
        label: 'Development',
        image: '/codeware/6a20128a.avif',
        alt: 'Website and application development',
      },
      {
        label: 'QA Testing',
        image: '/codeware/2c5cc882.avif',
        alt: 'Quality assurance and testing',
      },
      {
        label: 'Launch',
        image: '/codeware/bbddfd58.avif',
        alt: 'Website launch process',
      },
    ],
  },
  CwConsult: {
    kicker: 'Let’s find your next step',
    heading: 'An idea. A challenge.\nA conversation.',
    text: 'Tell us what you need to improve and what you already use. We’ll start with the right questions.',
    options: [
      {
        label: 'Build something new',
        enquiry: 'Build something new',
      },
      {
        label: 'Improve a system',
        enquiry: 'Improve an existing system',
      },
      {
        label: 'Explore a product',
        enquiry: 'Explore a product',
      },
    ],
    ctaLabel: 'Book a Call',
    keys: [
      {
        label: '',
        icon: '',
      },
      {
        label: 'Explore your idea',
        icon: 'design',
      },
      {
        label: '',
        icon: '',
      },
      {
        label: '',
        icon: '',
      },
      {
        label: 'Map your workflow',
        icon: 'connect',
      },
      {
        label: 'Product fit',
        icon: 'web',
      },
      {
        label: '',
        icon: '',
      },
      {
        label: 'Technical direction',
        icon: 'code',
      },
      {
        label: 'Plan next steps',
        icon: 'arrow',
      },
      {
        label: '',
        icon: '',
      },
      {
        label: '',
        icon: '',
      },
      {
        label: '',
        icon: '',
      },
    ],
  },
  CwFaq: {
    kicker: 'A few answers',
    heading: 'Questions?\nStart here.',
    text: 'From product fit to project scope, here are a few things you might want to know.',
    ctaLabel: 'Ask us a question',
    ctaHref: '#contact',
    items: [
      {
        q: 'What does Codeware develop?',
        a: 'Codeware offers custom software, websites, web applications, and mobile application development. Its published services also include SaaS development, design, and integrations. Explore the service that matches your requirements.',
      },
      {
        q: 'Do you offer existing software products?',
        a: 'Yes. Our featured offerings include CW ERP, iDesk360, CW Ticketing, and E-commerce Solution. Explore each offering to understand its purpose and available scope.',
      },
      {
        q: 'Can your software be customized?',
        a: 'CW ERP and the ticketing solution are described as customizable. For another product or a new build, share the workflow and changes you need so the scope can be reviewed.',
      },
      {
        q: 'Can you connect a new system to software we already use?',
        a: 'Codeware offers API integration services. Share the systems involved and the data or actions that need to connect; feasibility depends on their available interfaces and access.',
      },
      {
        q: 'How much will a project or product implementation cost?',
        a: 'ERP and ticketing pricing depends on scope and customization. For a useful estimate, share the product or service, required workflows, and any existing systems that need to connect.',
      },
      {
        q: 'How long will a project take?',
        a: 'The timeline depends on the scope, integrations, content and review stages. Share your target date and key requirements so the delivery approach can be discussed.',
      },
      {
        q: 'What support is available after launch?',
        a: 'Codeware’s ERP and ticketing pages describe implementation or ongoing support. The exact coverage, hours, and terms should be agreed for the selected product or project.',
      },
      {
        q: 'What should I include in my enquiry?',
        a: 'Describe your business, the task or problem, the users involved, and any software already in use. If you have a target date or a product in mind, include that too.',
      },
    ],
  },
  CwContact: {
    kicker: 'Let’s talk',
    heading: 'What can we\nmake work better?',
    intro:
      'A new product, an existing system, or an idea that needs a little clarity. Tell us where you want to go.',
    email: 'info@codewareltd.com',
    phone: '+880 1614 000401',
    address: 'Mohammadpur, Dhaka, Bangladesh',
    noteTitle: 'Start with what you know.',
    noteText:
      'You don’t need a finished specification. Share the problem, who it affects and any tools you already use.',
    badge: 'Let’s find the right solution for your business.',
    serviceOptions: [
      {
        name: 'Custom Software & SaaS',
      },
      {
        name: 'Web Development',
      },
      {
        name: 'Mobile Applications',
      },
      {
        name: 'UI/UX & Design',
      },
      {
        name: 'Integrations & Automation',
      },
      {
        name: 'Digital Marketing',
      },
    ],
    productOptions: [
      {
        name: 'CW ERP',
      },
      {
        name: 'iDesk360',
      },
      {
        name: 'CW Ticketing',
      },
      {
        name: 'E-commerce Solution',
      },
      {
        name: 'HR & Payroll Management',
      },
    ],
    submitLabel: 'Prepare email draft',
    privacyHref: 'https://www.codewareltd.com/privacy-policy/',
  },
  CwFooter: {
    globalHeading: 'Our Global Presence',
    globalImage:
      'https://images.unsplash.com/photo-1777047023536-8e47688b77f9?auto=format&fit=crop&w=1800&q=80',
    countries: [
      {
        role: 'Headquarters',
        name: 'Bangladesh',
        address:
          'House #629–685, Road 12\nBaitul Aman Housing Society, Adabor\nMohammadpur, Dhaka 1207',
        phone: '+880 1614 000401',
      },
      {
        role: 'Representative',
        name: 'Denmark',
        address: 'Gavlhusvej 9, 1tv\n2700 Copenhagen\nDenmark',
        phone: '+45 3187 2653',
      },
      {
        role: 'Representative',
        name: 'United Kingdom',
        address: '181 Archer Road\nCardiff, CF5 4FQ\nUnited Kingdom',
        phone: '+44 7506 205711',
      },
      {
        role: 'Representative',
        name: 'Germany',
        address: 'Cologne\nGermany',
        phone: '+49 176 76677984',
      },
    ],
    logo: '/codeware/5894dba3.svg',
    hqTitle: 'Our headquarters',
    hqAddress:
      'House #629–685, Road 12\nBaitul Aman Housing Society\nAdabor, Mohammadpur\nDhaka 1207, Bangladesh',
    email: 'info@codewareltd.com',
    phone: '+880 1614 000401',
    messengerHref: 'https://m.me/codewareltd',
    groups: [
      {
        title: 'Our services',
        links: [
          {
            label: 'Software & SaaS',
            href: '/services/custom-software',
          },
          {
            label: 'Web development',
            href: '/services/web-development',
          },
          {
            label: 'Mobile applications',
            href: '/services/mobile-apps',
          },
          {
            label: 'UI/UX & design',
            href: '/services/ui-ux-design',
          },
          {
            label: 'Integrations',
            href: '/services/integrations',
          },
          {
            label: 'Digital marketing',
            href: '/services/digital-marketing',
          },
        ],
      },
      {
        title: 'Our products',
        links: [
          {
            label: 'CW ERP',
            href: 'https://www.codewareltd.com/productlink/erp-software/',
          },
          {
            label: 'iDesk360',
            href: 'https://www.codewareltd.com/productlink/query-management-system/',
          },
          {
            label: 'CW Ticketing',
            href: 'https://www.codewareltd.com/productlink/bus-ticket-booking-system/',
          },
          {
            label: 'E-commerce Solution',
            href: 'https://www.codewareltd.com/productlink/ecommerce-solution/',
          },
          {
            label: 'HR & Payroll',
            href: 'https://www.codewareltd.com/productlink/hr-payroll-management/',
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            label: 'About Codeware',
            href: 'https://www.codewareltd.com/company-overview/',
          },
          {
            label: 'Selected work',
            href: '#work',
          },
          {
            label: 'Our process',
            href: '#process',
          },
          {
            label: 'Insights',
            href: 'https://www.codewareltd.com/blog/',
          },
          {
            label: 'FAQs',
            href: '#faq',
          },
          {
            label: 'Let’s talk ↗',
            href: '#contact',
          },
        ],
      },
    ],
    copyright: '© 2026 Codeware Limited. All rights reserved.',
    privacyHref: 'https://www.codewareltd.com/privacy-policy/',
  },
};

export type Defaults = typeof defaults;
