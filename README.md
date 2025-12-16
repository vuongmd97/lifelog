<!-- common -->

npm install @supabase/supabase-js @reduxjs/toolkit react-redux react-router-dom sass classnames

<!-- i18n -->

npm i i18next react-i18next i18next-browser-languagedetector

<!-- bắt lỗi runtime trong React (ở client) — để tránh crash toàn bộ app khi 1 component lỗi và hiển thị UI thay thế -->

npm install react-error-boundary

<!-- Cài môi trường để test UNIT TEST -->

npm install --save-dev vitest

<!-- Chỉnh sửa avatar resize,... -->

npm install react-avatar-editor

<!-- Show modal ở Root -->

npm install react-modal

<!-- Cài đặt Fullcalendar -->

npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction

<!-- Google Calendar API của FullCalendar để tự động lấy holidays -->

npm install @fullcalendar/google-calendar

<!-- Cài đặt react color, date picker và textarea autosize -->

npm install react-color react-datepicker react-textarea-autosize

<!-- date format

    'MMMM yyyy' → December 2024
    'MM/yyyy' → 12/2024
    'MMM yyyy' → Dec 2024
    'MMMM, yyyy' → December, 2024

 -->

npm install date-fns

<!-- Dropdown popper
    phải dùng react 18

    npm uninstall react react-dom
    npm install react@18 react-dom@18
-->

npm install @popperjs/core react-popper
